import { uniqBy } from 'lodash'

import { getApolloClient } from '@/api/apollo-client'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Shell from '@/components/structure/Shell'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import { gql } from '@apollo/client'

export default function Home({ posts, headerMenu, footerMenu, wpSettings }) {
  return (
    <Shell
      headerMenu={headerMenu}
      wpSettings={wpSettings}
      manualSeo={{
        title: `Blog - ${wpSettings.title}`,
        description: 'Blog Description',
      }}
    >
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
                <p className="text-center">Oops, no posts found!</p>
              </li>
            ))}
        </ul>
      </main>
    </Shell>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${POST_CARD_FIELDS}
      ${WP_SETTINGS_FIELDS}
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
        headerMenu: menus(where: { location: HEADER }) {
          edges {
            node {
              menuItems {
                nodes {
                  label
                  path
                  target
                }
              }
            }
          }
        }
        wpSettings: allSettings {
          ...WpSettingsFields
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

  const headerMenu =
    response?.data.headerMenu?.edges[0]?.node?.menuItems.nodes || null
  const footerMenu =
    response?.data.footerMenu?.edges[0]?.node?.menuItems.nodes || null

  const wpSettings = {
    ...response?.data.wpSettings,
  }

  return {
    props: {
      posts,
      headerMenu,
      footerMenu,
      wpSettings,
    },
    revalidate: 10,
  }
}
