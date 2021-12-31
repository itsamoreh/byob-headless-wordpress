import { getApolloClient } from 'lib/apollo-client'
import Head from 'next/head'
import Link from 'next/link'

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
              return (
                <li key={post.slug}>
                  <div className="max-w-2xl mx-auto mb-8 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <Link href={post.path}>
                      <a>
                        {post.featuredImage?.node?.sourceUrl && (
                          <img
                            className="object-cover w-full h-64"
                            src={post.featuredImage?.node?.sourceUrl}
                            alt="Article"
                          />
                        )}

                        <div className="p-6">
                          <h3 className="block text-2xl font-black text-gray-800 dark:text-white hover:text-gray-600 hover:underline">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p
                              className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                              dangerouslySetInnerHTML={{
                                __html: post.excerpt,
                              }}
                            />
                          )}
                        </div>
                      </a>
                    </Link>
                  </div>
                </li>
              )
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

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 10000) {
          edges {
            node {
              id
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              excerpt
              title
              slug
            }
          }
        }
      }
    `,
  })

  const posts = data?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
        path: `/posts/${post.slug}`,
      }
    })

  const page = {
    ...data?.data.generalSettings,
  }

  return {
    props: {
      page,
      posts,
    },
  }
}
