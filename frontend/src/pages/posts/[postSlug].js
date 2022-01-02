import parse from 'date-fns/format'
import Head from 'next/head'
import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { CALL_TO_ACTION_FIELDS } from '@/components/blocks/CallToAction/CallToAction'
import { FREEFORM_FIELDS } from '@/components/blocks/Freeform/Freeform'
import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import phpDateTokensToUnicode from '@/lib/php-date-tokens-to-unicode'
import { gql } from '@apollo/client'

export default function Post({ post, site }) {
  return (
    <WpSettingsContext.Consumer>
      {(wpSettings) => (
        <div>
          <Head>
            <title>{post.title}</title>
            <meta
              name="description"
              content={`Read more about ${post.title} on ${site.title}`}
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <div className="container max-w-4xl my-16">
              {post?.featuredImage?.node?.sourceUrl && (
                <img
                  className="mb-16 rounded-lg mx-auto object-cover w-full aspect-[5/2] shadow-md"
                  srcSet={post?.featuredImage?.node?.srcSet}
                  src={post?.featuredImage?.node?.sourceUrl}
                  alt={
                    post?.featuredImage?.node?.altText ||
                    `Featured Image for ${post.title}`
                  }
                />
              )}
              <h1 className="mb-8 text-6xl font-extrabold leading-tight text-center break-words">
                {post.title}
              </h1>

              <div className="mx-auto text-sm leading-snug text-center text-gray-600">
                <span>
                  {parse(
                    new Date(post.date),
                    `${phpDateTokensToUnicode(
                      wpSettings?.generalSettingsDateFormat
                    )}`,
                    new Date()
                  ).toString()}
                </span>
                <span>
                  {parse(
                    new Date(post.date),
                    ` 'at' ${phpDateTokensToUnicode(
                      wpSettings?.generalSettingsTimeFormat
                    )}`,
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
              <div className="mx-auto prose prose-indigo">
                <hr />
                <Link href="/">
                  <a>← Back to home</a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      )}
    </WpSettingsContext.Consumer>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params

  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: gql`
      ${POST_FIELDS}
      ${CALL_TO_ACTION_FIELDS}
      ${FREEFORM_FIELDS}
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          ...PostFields
          blocks {
            ... on CoreFreeformBlock {
              ...FreeformFields
            }
            ... on AcfByobCallToActionBlock {
              ...CallToActionFields
            }
          }
        }
      }
    `,
    variables: {
      slug: postSlug,
    },
  })

  const post = data?.data.postBy

  const site = {
    ...data?.data.generalSettings,
  }

  return {
    props: {
      post,
      site,
    },
  }
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: gql`
      {
        posts(first: 10000) {
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

  const posts = data?.data.posts.edges.map(({ node }) => node)

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          postSlug: slug,
        },
      }
    }),
    fallback: false,
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
