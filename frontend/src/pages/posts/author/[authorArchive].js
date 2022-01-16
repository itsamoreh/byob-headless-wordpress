import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'
import ArchiveHeader from '@/components/global/ArchiveHeader'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Shell from '@/components/structure/Shell'
import { FOOTER_MENU } from '@/components/structure/Shell/Footer/Footer'
import { NAVIGATION_MENU } from '@/components/structure/Shell/Navigation/Navigation'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import { gql } from '@apollo/client'

export default function AuthorSingle({ author, menus, wpSettings }) {
  const posts = author?.posts?.nodes || []

  return (
    <Shell
      wpSettings={wpSettings}
      menus={menus}
      manualSeo={{
        title: `Posts by ${author.name} - ${wpSettings.title}`,
        description: author.description || '',
      }}
    >
      <ArchiveHeader
        imageUrl={author?.avatar?.url}
        imageAlt={`Picture of ${author?.name}`}
        preposition="by"
        title={author?.name}
        description={author?.description}
      />

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
        ${NAVIGATION_MENU}
        ${FOOTER_MENU}
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
      author,
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
