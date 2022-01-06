import { flatMap } from 'lodash'
import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Shell from '@/components/structure/Shell'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import { gql } from '@apollo/client'

export default function CategoryArchive({ category, wpSettings }) {
  const posts = category?.posts?.nodes || []

  return (
    <Shell
      wpSettings={wpSettings}
      manualSeo={{
        title: `Posts categorized ${category.name} - ${wpSettings.title}`,
        description: category.description || '',
      }}
    >
      <header className="mb-16 bg-indigo-50">
        <div className="flex flex-col max-w-5xl px-6 py-20 mx-auto space-y-8 md:space-y-0 md:items-center md:justify-between md:flex-row">
          <div className="max-w-md mx-auto md:max-w-none">
            <h1 className="text-3xl font-extrabold leading-tight break-words md:text-4xl">
              category{' '}
              <span className="text-4xl text-indigo-600 md:text-5xl">
                {category?.name}
              </span>
            </h1>

            {category.description && (
              <p className="mt-2 md:mt-4 max-w-[75ch] text-sm text-gray-600 md:text-base">
                {category?.description}
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
  const { categoryArchive } = params

  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${WP_SETTINGS_FIELDS}
      ${POST_CARD_FIELDS}
      query CategoryById($slug: ID!) {
        category(id: $slug, idType: SLUG) {
          uri
          name
          description
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
      slug: categoryArchive,
    },
  })

  const category = response?.data.category

  const wpSettings = {
    ...response?.data.wpSettings,
  }

  return {
    props: {
      category,
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
        categories(first: 10000) {
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

  const categories = response?.data.categories.edges.map(({ node }) => node)

  return {
    paths: categories.map(({ slug }) => {
      return {
        params: {
          categoryArchive: slug,
        },
      }
    }),
    fallback: false,
  }
}
