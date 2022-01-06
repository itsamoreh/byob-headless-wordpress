import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Shell from '@/components/structure/Shell'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import { gql } from '@apollo/client'

export default function AuthorSingle({ author, wpSettings }) {
  const posts = author?.posts?.nodes || []

  return (
    <Shell
      wpSettings={wpSettings}
      manualSeo={{
        title: `Posts by ${author.name} - ${wpSettings.title}`,
        description: author.description || '',
      }}
    >
      <header className="bg-indigo-50">
        <div className="container flex flex-col mx-auto mb-10 md:mb-16">
          <div className="max-w-md py-16 mx-auto text-center md:py-20 md:max-w-none md:text-left">
            {author?.avatar?.url && (
              <img
                className="mb-4 md:mb-0 md:mr-10 rounded-full mx-auto object-cover w-48 h-48 aspect-[1/1] shadow-md md:float-left [shape-outside:circle()]"
                src={author.avatar.url}
                alt={`Picture of ${author?.name}`}
              />
            )}
            <h1 className="text-3xl font-extrabold leading-tight break-words md:text-4xl">
              by{' '}
              <span className="text-4xl text-indigo-600 md:text-5xl">
                {author?.name}
              </span>
            </h1>

            {author.description && (
              <p className="mt-2 md:mt-4 max-w-[75ch] text-sm text-gray-600 md:text-base">
                {author?.description}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="mb-16">
        <ul className="container max-w-2xl">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return <li key={post.id}>{<PostCard {...post} />}</li>
            })}

          {!posts ||
            (posts.length === 0 && (
              <li>
                <p className="text-center">Oops, no posts found!</p>
              </li>
            ))}
        </ul>
      </main>

      <div className="container pb-16">
        <div className="mx-auto prose prose-indigo">
          <hr />
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      </div>
    </Shell>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { authorArchive } = params

  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${AUTHOR_FIELDS}
      ${WP_SETTINGS_FIELDS}
      ${POST_CARD_FIELDS}
      query AuthorBySlug($slug: ID!) {
        user(id: $slug, idType: SLUG) {
          ...AuthorFields
          posts {
            nodes {
              ...PostCardFields
            }
          }
        }
        wpSettings: allSettings {
          ...WpSettingsFields
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
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      {
        users(first: 100) {
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

  const authors = response?.data.users.edges.map(({ node }) => node)

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
