import { uniqBy } from 'lodash'

import { getApolloClient } from '@/api/apollo-client'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Head from '@/components/structure/Shell/Head'
import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import { gql } from '@apollo/client'

// import Head from 'next/head'

export default function Home({ posts, wpSettings }) {
  return (
    <WpSettingsContext.Provider value={wpSettings}>
      <div>
        <Head
          manualSeo={{
            title: `Blog - ${wpSettings.title}`,
            description: 'Blog Description',
          }}
        />

        <main className="mb-16">
          <ul className="container max-w-2xl">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => {
                return (
                  <li key={post.id}>
                    <PostCard {...post} />
                  </li>
                )
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
    </WpSettingsContext.Provider>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${POST_CARD_FIELDS}
      query PostList {
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
        wpSettings: allSettings {
          dateFormat: generalSettingsDateFormat
          description: generalSettingsDescription
          startOfWeek: generalSettingsStartOfWeek
          timeFormat: generalSettingsTimeFormat
          timezone: generalSettingsTimezone
          title: generalSettingsTitle
          postsPerPage: readingSettingsPostsPerPage
          defaultCategory: writingSettingsDefaultCategory
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

  const wpSettings = {
    ...response?.data.wpSettings,
  }

  return {
    props: {
      posts,
      wpSettings,
    },
  }
}
