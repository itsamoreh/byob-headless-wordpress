import { gql } from '@apollo/client'
import Link from 'next/link'

import { getApolloClient } from '@/api/apollo-client'

import Shell from '@/components/structure/Shell'
import { FOOTER_MENU } from '@/components/structure/Shell/Footer/Footer'
import { NAVIGATION_MENU } from '@/components/structure/Shell/Navigation/Navigation'
// TODO: There is an issue with the wp-graphql-the-seo-framework. Tag archive SEO does not work.
// import { TAG_SEO_FIELDS } from '@/components/structure/Shell/Head/Head'
import { WP_SETTINGS_FIELDS } from '@/components/structure/Shell/Shell'

import ArchiveHeader from '@/components/global/ArchiveHeader'
import PostCard from '@/components/global/PostCard'
import { POST_CARD_FIELDS } from '@/components/global/PostCard/PostCard'

export default function tagArchive({ tag, menus, wpSettings }) {
  const posts = tag?.posts?.nodes || []

  return (
    <Shell
      wpSettings={wpSettings}
      menus={menus}
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
        <div className="prose prose-indigo mx-auto">
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
        ${NAVIGATION_MENU}
        ${FOOTER_MENU}
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
      tag,
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
