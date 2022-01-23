import { uniqBy } from 'lodash'

import { getApolloClient } from '@/api/apollo-client'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Shell from '@/components/structure/Shell'
import { FOOTER_MENU } from '@/components/structure/Shell/Footer/Footer'
import { NAVIGATION_MENU } from '@/components/structure/Shell/Navigation/Navigation'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import { gql } from '@apollo/client'

export default function Home({ posts, menus, wpSettings }) {
  return (
    <Shell
      wpSettings={wpSettings}
      menus={menus}
      manualSeo={{
        title: `Blog - ${wpSettings.title}`,
        description: 'Blog Description',
      }}
    >
      <main className="mb-8 lg:my-16">
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
        ${NAVIGATION_MENU}
        ${FOOTER_MENU}
        wpSettings: allSettings {
          ...WpSettingsFields
        }
      }
    `,
  })

  let posts = response?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
      }
    })

  const stickyPost = response?.data.stickyPost.nodes[0]

  // Push sticky post to the top of the list.
  if (stickyPost) {
    posts.unshift(stickyPost)

    // Make sure there are no duplicates.
    posts = uniqBy(posts, 'id')
  }

  const menus = {
    navigationMenu:
      response?.data.navigationMenu?.edges[0]?.node?.menuItems?.nodes || null,
    footerMenu:
      response?.data.footerMenu?.edges[0]?.node?.menuItems?.nodes || null,
  }

  const wpSettings = response?.data?.wpSettings
    ? {
        ...response.data.wpSettings,
      }
    : null

  return {
    props: {
      posts,
      menus,
      wpSettings,
    },
    revalidate: 10,
  }
}
