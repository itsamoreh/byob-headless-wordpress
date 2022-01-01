import { getApolloClient } from 'lib/apollo-client'
import { uniqBy } from 'lodash'
import Head from 'next/head'

import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import { gql } from '@apollo/client'

export default function Home({ page, posts }) {
  const { title, description } = page
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-16">
        <ul>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return <PostCard key={post.id} {...post} />
            })}

          {!posts ||
            (posts.length === 0 && (
              <li>
                <p>Oops, no posts found!</p>
              </li>
            ))}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${POST_CARD_FIELDS}
      query PostList {
        generalSettings {
          title
          description
        }
        posts(first: 10) {
          edges {
            node {
              ...PostCardFields
            }
          }
        }
        stickyPost: posts(
          where: { onlySticky: true, orderby: { field: MODIFIED, order: DESC } }
          first: 1
        ) {
          nodes {
            ...PostCardFields
          }
        }
      }
    `,
  })

  const stickyPost = response?.data.stickyPost.nodes[0]

  let posts = response?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
      }
    })

  // Push sticky post to the top of the list.
  if (stickyPost) {
    posts.unshift(stickyPost)

    // Make sure there are no duplicates.
    posts = uniqBy(posts, 'id')
  }

  const page = {
    ...response?.data.generalSettings,
  }

  return {
    props: {
      page,
      posts,
    },
  }
}
