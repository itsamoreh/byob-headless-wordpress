import Head from 'next/head'
import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'
import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import { gql } from '@apollo/client'

export default function AuthorSingle({ author, wpSettings }) {
  return (
    <WpSettingsContext.Provider value={wpSettings}>
      <div>
        <Head>
          <title>Posts by {author.name}</title>
          <meta
            name="description"
            content={`Read more about ${author.name} on ${wpSettings.title}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="bg-indigo-50">
          <div className="flex flex-col max-w-5xl px-6 py-8 mx-auto space-y-8 md:space-y-0 md:items-center md:justify-between md:flex-row">
            <div className="max-w-md mx-auto md:max-w-none">
              <h1 className="text-3xl font-extrabold leading-tight break-words lg:text-5xl">
                by{' '}
                <span className="text-4xl text-indigo-600 lg:text-6xl">
                  {author?.name}
                </span>
              </h1>

              {author.description && (
                <p className="mt-2 text-sm text-gray-600 lg:text-base">
                  {author?.description}
                </p>
              )}
            </div>

            {author?.avatar?.url && (
              <img
                className="md:ml-16 rounded-full mx-auto object-cover w-52 lg:w-72 aspect-[1/1] shadow-md"
                src={author.avatar.url}
                alt={`Picture of ${author?.name}`}
              />
            )}
          </div>
        </header>

        <div className="container pb-16">
          <div className="mx-auto prose prose-indigo">
            <hr />
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        </div>
      </div>
    </WpSettingsContext.Provider>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { authorArchive } = params

  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${AUTHOR_FIELDS}
      query AuthorBySlug($slug: ID!) {
        wpSettings: allSettings {
          generalSettingsDateFormat
          generalSettingsDescription
          generalSettingsStartOfWeek
          generalSettingsTimeFormat
          generalSettingsTimezone
          generalSettingsTitle
          readingSettingsPostsPerPage
          writingSettingsDefaultCategory
        }
        user(id: $slug, idType: SLUG) {
          ...AuthorFields
        }
      }
    `,
    variables: {
      slug: authorArchive,
    },
  })

  const author = response?.data.user

  const wpSettings = {
    ...response?.data.wpSettings,
  }

  return {
    props: {
      author,
      wpSettings,
    },
  }
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: gql`
      {
        users(first: 10000) {
          edges {
            node {
              id
              slug
              name
            }
          }
        }
      }
    `,
  })

  const authors = data?.data.users.edges.map(({ node }) => node)

  return {
    paths: authors.map(({ slug }) => {
      return {
        params: {
          authorArchive: slug,
        },
      }
    }),
    fallback: false,
  }
}

export const AUTHOR_FIELDS = gql`
  fragment AuthorFields on User {
    uri
    name
    description
    avatar(size: 500) {
      url
    }
  }
`
