import Head from 'next/head'
import Link from 'next/link'

import Blocks from '@/components/blocks/Blocks'
import { CALL_TO_ACTION_FIELDS } from '@/components/blocks/CallToAction/CallToAction'
import { FREEFORM_FIELDS } from '@/components/blocks/Freeform/Freeform'
import { getApolloClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'

export default function Post({ post, site }) {
  return (
    <div className="container">
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={`Read more about ${post.title} on ${site.title}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="container max-w-4xl mx-auto my-16 text-6xl font-extrabold text-center break-words">
          {post.title}
        </h1>

        <Blocks blocks={post.blocks} />

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
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params

  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: gql`
      ${CALL_TO_ACTION_FIELDS}
      ${FREEFORM_FIELDS}
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          blocksJSON
          blocks {
            ... on CoreFreeformBlock {
              ...FreeformFields
            }
            ... on AcfByobCallToActionBlock {
              ...CallToActionFields
            }
          }
          title
          slug
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
