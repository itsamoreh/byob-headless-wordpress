import parse from 'date-fns/format'
import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { CALL_TO_ACTION_FIELDS } from '@/components/blocks/CallToAction/CallToAction'
import { FREEFORM_FIELDS } from '@/components/blocks/Freeform/Freeform'
import Shell from '@/components/structure/Shell'
import { PAGE_SEO_FIELDS } from '@/components/structure/Shell/Head/Head'
import { NAVIGATION_FIELDS } from '@/components/structure/Shell/Navigation/Navigation'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import phpDateTokensToUnicode from '@/lib/php-date-tokens-to-unicode'
import { gql } from '@apollo/client'

export default function Post({ page, headerMenu, wpSettings }) {
  if (!page) return '' // TODO: forward to 404 page
  return (
    <Shell wpSettings={wpSettings} headerMenu={headerMenu} seo={page.seo}>
      <main>
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
      ${NAVIGATION_FIELDS}
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
  const headerMenu =
    response?.data.headerMenu?.edges[0]?.node?.menuItems.nodes || null
  const wpSettings = {
    ...response?.data.wpSettings,
  }

  return {
    props: {
      page,
      headerMenu,
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
