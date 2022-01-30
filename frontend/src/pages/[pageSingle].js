import { gql } from '@apollo/client'

import { getApolloClient } from '@/api/apollo-client'

import Shell from '@/components/structure/Shell'
import { FOOTER_MENU } from '@/components/structure/Shell/Footer/Footer'
import { PAGE_SEO_FIELDS } from '@/components/structure/Shell/Head/Head'
import { NAVIGATION_MENU } from '@/components/structure/Shell/Navigation/Navigation'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'

import BlockRenderer from '@/components/blocks/BlockRenderer'
import { CALL_TO_ACTION_FIELDS } from '@/components/blocks/CallToAction/CallToAction'
import { FREEFORM_FIELDS } from '@/components/blocks/Freeform/Freeform'

export default function Post({ page, menus, wpSettings }) {
  if (!page) return '' // TODO: forward to 404 page
  return (
    <Shell wpSettings={wpSettings} menus={menus} seo={page.seo}>
      <main>
        <h1 className="mb-8 break-words text-center text-6xl font-extrabold leading-tight">
          {page.title}
        </h1>
        <BlockRenderer blocks={page.blocks} />
      </main>
    </Shell>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { pageSingle } = params

  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${PAGE_FIELDS}
      ${PAGE_SEO_FIELDS}
      ${CALL_TO_ACTION_FIELDS}
      ${FREEFORM_FIELDS}
      ${WP_SETTINGS_FIELDS}
      query PageBySlug($uri: String!) {
        pageBy(uri: $uri) {
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
        ${NAVIGATION_MENU}
        ${FOOTER_MENU}
        wpSettings: allSettings {
          ...WpSettingsFields
        }
      }
    `,
    variables: {
      uri: pageSingle,
    },
  })

  const page = response?.data.pageBy

  const menus = {
    navigationMenu:
      response?.data.navigationMenu?.edges[0]?.node?.menuItems?.nodes || null,
    footerMenu:
      response?.data.footerMenu?.edges[0]?.node?.menuItems?.nodes || null,
  }

  const wpSettings = {
    ...response?.data.wpSettings,
  }

  return {
    props: {
      page,
      menus,
      wpSettings,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      {
        pages(first: 1000) {
          edges {
            node {
              id
              title
              uri
            }
          }
        }
      }
    `,
  })

  const pages = response?.data.pages.edges.map(({ node }) => node)

  return {
    paths: pages.map(({ uri }) => {
      return {
        params: {
          pageSingle: uri,
        },
      }
    }),
    fallback: 'blocking',
  }
}

export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    id
    uri
    title
    date
  }
`
