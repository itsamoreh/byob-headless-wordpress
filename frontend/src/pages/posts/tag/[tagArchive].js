import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'
import ArchiveHeader from '@/components/global/ArchiveHeader'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'
import Shell from '@/components/structure/Shell'
// import { TAG_SEO_FIELDS } from '@/components/structure/Shell/Head/Head'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'
import { gql } from '@apollo/client'
import { NAVIGATION_FIELDS } from '@/components/structure/Shell/Navigation/Navigation'

export default function tagArchive({ tag, headerMenu, wpSettings }) {
  const posts = tag?.posts?.nodes || []

  return (
    <Shell
      wpSettings={wpSettings}
      headerMenu={headerMenu}
      seo={tag.seo}
      manualSeo={{
        title: `Posts tagged ${tag.name} - ${wpSettings.title}`,
        description: tag.description || '',
      }}
    >
      <ArchiveHeader
        preposition="tag"
        title={`#${tag?.name}`}
        description={tag?.description}
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
  const { tagArchive } = params

  const apolloClient = getApolloClient()

  const response = await apolloClient.query({
    query: gql`
      ${WP_SETTINGS_FIELDS}
      ${POST_CARD_FIELDS}
      query TagById($slug: ID!) {
        tag(id: $slug, idType: SLUG) {
          # ...TagSeoFields
          uri
          name
          description
          posts {
            nodes {
              ...PostCardFields
            }
          }
        }
        ${NAVIGATION_FIELDS}
        wpSettings: allSettings {
          ...WpSettingsFields
        }
      }
    `,
    variables: {
      slug: tagArchive,
    },
  })

  const tag = response?.data.tag
  const headerMenu =
    response?.data.headerMenu?.edges[0]?.node?.menuItems.nodes || null
  const wpSettings = {
    ...response?.data.wpSettings,
  }

  return {
    props: {
      tag,
      headerMenu,
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
        tags(first: 10000) {
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

  const tags = response?.data.tags.edges.map(({ node }) => node)

  return {
    paths: tags.map(({ slug }) => {
      return {
        params: {
          tagArchive: slug,
        },
      }
    }),
    fallback: false,
  }
}
