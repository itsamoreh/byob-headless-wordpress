import { getApolloClient } from 'lib/apollo-client'
import Head from 'next/head'
import Link from 'next/link'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import PostCard from '@/components/global/PostCard'

import { gql } from '@apollo/client'

import styles from '../styles/Home.module.css'

export default function Home({ page, posts }) {
  const { title, description } = page
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mb-16">
        <ul>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return <PostCard key={post.id} {...post} />
            })}

          {!posts ||
            (posts.length === 0 && (
              <li>
                <p>Oops, no posts found!</p>
              </li>
            ))}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${POST_CARD_FIELDS}
      query PostList {
        generalSettings {
          title
          description
        }
        posts(first: 10) {
          edges {
            node {
              ...PostCardFields
            }
          }
        }
      }
    `,
  })

  const posts = response?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
      }
    })

  const page = {
    ...response?.data.generalSettings,
  }

  return {
    props: {
      page,
      posts,
    },
  }
}
