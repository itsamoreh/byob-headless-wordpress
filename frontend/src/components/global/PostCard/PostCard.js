import parse from 'date-fns/format'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import convertPhpDateTokens from '@/lib/convert-php-date-tokens'
import { gql } from '@apollo/client'

/**
 * Post - Card
 *
 * Display a Card for a post.
 */
export default function PostCard({
  id,
  uri,
  title,
  date,
  excerpt,
  featuredImage,
  author,
  tags,
  categories,
}) {
  return (
    <WpSettingsContext.Consumer>
      {(wpSettings) => (
        <div className="container">
          <div className="relative max-w-2xl mx-auto mb-8 overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg group">
            {featuredImage?.node?.sourceUrl && (
              <img
                className="object-cover w-full h-64"
                src={featuredImage?.node?.sourceUrl}
                alt={
                  featuredImage?.node?.altText || `Featured Image for ${title}`
                }
              />
            )}

            <div className="p-6">
              <Link href={uri}>
                <a className="before:absolute before:inset-0">
                  <h3 className="block mb-3 text-2xl font-black transition-colors text-zinc-800 group-hover:text-indigo-600">
                    {title}
                  </h3>
                </a>
              </Link>
              <div className="flex mb-5 space-x-2 basis-full">
                {categories?.edges?.length > 0 &&
                  categories.edges.map((tag) => {
                    return (
                      <Link href={tag?.node?.uri} key={tag?.node?.id}>
                        <a className="relative text-xs hover:underline text-zinc-600 decoration-indigo-600">
                          /{tag?.node?.name}
                        </a>
                      </Link>
                    )
                  })}
                {tags?.edges?.length > 0 &&
                  tags.edges.map((tag) => {
                    return (
                      <Link href={tag?.node?.uri} key={tag?.node?.id}>
                        <a className="relative text-xs hover:underline text-zinc-600 decoration-indigo-600">
                          #{tag?.node?.name}
                        </a>
                      </Link>
                    )
                  })}
              </div>
              {excerpt && (
                <div
                  className="mb-6 text-sm text-zinc-600"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                />
              )}
              {/* Footer */}
              <div className="flex flex-wrap items-center">
                <Link href={author?.node.uri}>
                  <a className="relative flex items-center">
                    <div className="mr-2 shrink-0">
                      {author?.node?.avatar?.url && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={author.node.avatar.url}
                          alt={`Avatar for ${author?.node?.name}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm font-medium truncate transition-colors text-zinc-600 hover:underline decoration-indigo-600">
                        {author?.node?.name}
                      </p>
                    </div>
                  </a>
                </Link>
                <p className="ml-auto text-xs text-right truncate text-zinc-600">
                  {parse(
                    new Date(date),
                    `${convertPhpDateTokens(
                      wpSettings?.generalSettingsDateFormat
                    )} 'at' ${convertPhpDateTokens(
                      wpSettings?.generalSettingsTimeFormat
                    )}`,
                    new Date()
                  ).toString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </WpSettingsContext.Consumer>
  )
}

PostCard.propTypes = {
  id: PropTypes.string,
  uri: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  featuredImage: PropTypes.shape({
    node: PropTypes.shape({
      sourceUrl: PropTypes.string,
      srcSet: PropTypes.string,
      altText: PropTypes.string,
    }),
  }),
  author: PropTypes.shape({
    node: PropTypes.shape({
      name: PropTypes.string,
      uri: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }),
  tags: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          uri: PropTypes.string,
          name: PropTypes.string,
        }),
      })
    ),
  }),
  categories: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          uri: PropTypes.string,
          name: PropTypes.string,
        }),
      })
    ),
  }),
}

export const POST_CARD_FIELDS = gql`
  fragment PostCardFields on Post {
    id
    uri
    title
    date
    excerpt(format: RENDERED)
    featuredImage {
      node {
        srcSet(size: MEDIUM)
        sourceUrl(size: MEDIUM_LARGE)
        altText
      }
    }
    author {
      node {
        uri
        name
        avatar {
          url
        }
      }
    }
    tags(first: 3) {
      edges {
        node {
          id
          uri
          name
        }
      }
    }
    categories(first: 3) {
      edges {
        node {
          id
          uri
          name
        }
      }
    }
  }
`
