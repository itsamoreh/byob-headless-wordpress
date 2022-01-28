import { uniqBy } from 'lodash'

import { getApolloClient } from '@/api/apollo-client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { CALL_TO_ACTION_FIELDS } from '@/components/blocks/CallToAction/CallToAction'
import { FREEFORM_FIELDS } from '@/components/blocks/Freeform/Freeform'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Shell from '@/components/structure/Shell'
import { FOOTER_MENU } from '@/components/structure/Shell/Footer/Footer'
import { PAGE_SEO_FIELDS } from '@/components/structure/Shell/Head/Head'
import { NAVIGATION_MENU } from '@/components/structure/Shell/Navigation/Navigation'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import { PAGE_FIELDS } from '@/pages/[pageSingle]'
import { gql } from '@apollo/client'

export default function Home({ homepage, posts, menus, wpSettings }) {
  if (homepage) {
    return (
      <Shell wpSettings={wpSettings} menus={menus} seo={homepage.seo}>
        <main>
          <h1 className="mb-8 break-words text-center text-6xl font-extrabold leading-tight">
            {homepage.title}
          </h1>
          <BlockRenderer blocks={homepage.blocks} />
        </main>
      </Shell>
    )
  } else if (posts) {
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
  } else {
    return '' // TODO: forward to 404 page
  }
}

export async function getServerSideProps() {
  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${PAGE_FIELDS}
      ${PAGE_SEO_FIELDS}
      ${CALL_TO_ACTION_FIELDS}
      ${FREEFORM_FIELDS}
      ${WP_SETTINGS_FIELDS}
      ${POST_CARD_FIELDS}
      query HomePage {
        homepage {
          ...PageFields
          ...PageSeoFields
          blocks {
            ... on CoreFreeformBlock {
              ...FreeformFields
            }
            ... on AcfByobCallToActionBlock {
              ...CallToActionFields
            }
          }
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
        ${NAVIGATION_MENU}
        ${FOOTER_MENU}
        wpSettings: allSettings {
          ...WpSettingsFields
        }
      }
    `,
  })

  const homepage = response?.data.homepage

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
    props: { homepage, posts, menus, wpSettings },
  }
}
