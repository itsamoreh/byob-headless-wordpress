import { gql } from '@apollo/client'
import { uniqBy } from 'lodash'

import { getApolloClient } from '@/api/apollo-client'

import { PAGE_FIELDS } from '@/pages/[pageSingle]'

import Shell from '@/components/structure/Shell'
import { FOOTER_MENU } from '@/components/structure/Shell/Footer/Footer'
import { PAGE_SEO_FIELDS } from '@/components/structure/Shell/Head/Head'
import { NAVIGATION_MENU } from '@/components/structure/Shell/Navigation/Navigation'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'

import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'

import BlockRenderer from '@/components/blocks/BlockRenderer'
import { CALL_TO_ACTION_FIELDS } from '@/components/blocks/CallToAction/CallToAction'
import { FREEFORM_FIELDS } from '@/components/blocks/Freeform/Freeform'

export default function PostArchive({ page, posts, menus, wpSettings }) {
  return (
    <Shell
      wpSettings={wpSettings}
      menus={menus}
      seo={page.seo}
      manualSeo={{
        title: `Blog - ${wpSettings.title}`,
        description: 'Blog Description',
      }}
    >
      <main className="mb-8 lg:my-16">
        <BlockRenderer blocks={page.blocks} />
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
      ${PAGE_FIELDS}
      ${PAGE_SEO_FIELDS}
      ${CALL_TO_ACTION_FIELDS}
      ${FREEFORM_FIELDS}
      ${WP_SETTINGS_FIELDS}
      query PostList {
        pageBy(uri: "posts") {
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

  const page = response?.data.pageBy

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
      page,
      posts,
      menus,
      wpSettings,
    },
    revalidate: 10,
  }
}
