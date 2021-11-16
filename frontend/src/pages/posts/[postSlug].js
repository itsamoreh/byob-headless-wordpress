import Head from 'next/head'
import Link from 'next/link'
import Blocks from '@/components/blocks/Blocks'
import { gql } from '@apollo/client'

import { getApolloClient } from '@/lib/apollo-client'

import styles from '../../styles/Home.module.css'

export default function Post({ post, site }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={`Read more about ${post.title} on ${site.title}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.grid}>
          <Blocks blocks={JSON.parse(post.blocksJSON)} />
        </div>

        <p className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params

  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: gql`
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          blocksJSON
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
