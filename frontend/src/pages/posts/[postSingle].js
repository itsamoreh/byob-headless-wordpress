import { gql } from '@apollo/client'
import parse from 'date-fns/format'
import Link from 'next/link'

import phpDateTokensToUnicode from '@/lib/php-date-tokens-to-unicode'

import { getApolloClient } from '@/api/apollo-client'

import Shell from '@/components/structure/Shell'
import { FOOTER_MENU } from '@/components/structure/Shell/Footer/Footer'
import { POST_SEO_FIELDS } from '@/components/structure/Shell/Head/Head'
import { NAVIGATION_MENU } from '@/components/structure/Shell/Navigation/Navigation'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'

import BlockRenderer from '@/components/blocks/BlockRenderer'
import { CALL_TO_ACTION_FIELDS } from '@/components/blocks/CallToAction/CallToAction'
import { FREEFORM_FIELDS } from '@/components/blocks/Freeform/Freeform'

export default function Post({ post, menus, wpSettings }) {
  if (!post) return '' // TODO: forward to 404 page
  return (
    <Shell wpSettings={wpSettings} menus={menus} seo={post.seo}>
      <main>
        <div className="container mb-8 max-w-4xl lg:my-16">
          {post?.featuredImage?.node?.sourceUrl && (
            <img
              className="mx-auto mb-16 aspect-[5/2] w-full rounded-lg object-cover shadow-md"
              srcSet={post?.featuredImage?.node?.srcSet}
              src={post?.featuredImage?.node?.sourceUrl}
              alt={
                post?.featuredImage?.node?.altText ||
                `Featured Image for ${post.title}`
              }
            />
          )}
          <h1 className="mb-8 break-words text-center text-6xl font-extrabold leading-tight">
            {post.title}
          </h1>

          <div className="mx-auto text-center text-sm leading-snug text-gray-600">
            <span>
              {parse(
                new Date(post.date),
                `${phpDateTokensToUnicode(wpSettings?.dateFormat)}`,
                new Date()
              ).toString()}
            </span>
            <span>
              {parse(
                new Date(post.date),
                ` 'at' ${phpDateTokensToUnicode(wpSettings?.timeFormat)}`,
                new Date()
              ).toString()}
            </span>
            <span className="block">
              by{' '}
              <Link href={post.author?.node.uri}>
                <a className="text-gray-600 transition-colors hover:text-indigo-600 hover:underline">
                  {post?.author?.node?.name}
                </a>
              </Link>
            </span>
          </div>
        </div>

        <BlockRenderer blocks={post.blocks} />

        <div className="container pb-16">
          <div className="prose prose-indigo mx-auto">
            <hr />
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        </div>
      </main>
    </Shell>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSingle } = params

  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${POST_FIELDS}
      ${POST_SEO_FIELDS}
      ${CALL_TO_ACTION_FIELDS}
      ${FREEFORM_FIELDS}
      ${WP_SETTINGS_FIELDS}
      query PostBySlug($slug: String!) {
        postBy(slug: $slug) {
          ...PostFields
          ...PostSeoFields
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
      slug: postSingle,
    },
  })

  const post = response?.data.postBy

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
      post,
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
        posts(first: 1000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  })

  const posts = response?.data.posts.edges.map(({ node }) => node)

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          postSingle: slug,
        },
      }
    }),
    fallback: 'blocking',
  }
}

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    uri
    title
    date
    isSticky
    excerpt(format: RENDERED)
    featuredImage {
      node {
        srcSet(size: MEDIUM)
        sourceUrl(size: MEDIUM_LARGE)
        altText
      }
    }
    author {
      node {
        uri
        name
        avatar {
          url
        }
      }
    }
    tags(first: 3) {
      nodes {
        id
        uri
        name
      }
    }
    categories(first: 3) {
      nodes {
        id
        databaseId
        uri
        name
      }
    }
  }
`
