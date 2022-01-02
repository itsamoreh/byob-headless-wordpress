import parse from 'date-fns/format'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import phpDateTokensToUnicode from '@/lib/php-date-tokens-to-unicode'
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
  isSticky,
  excerpt,
  featuredImage,
  author,
  tags,
  categories,
}) {
  return (
    <WpSettingsContext.Consumer>
      {(wpSettings) => (
        <div className="relative mx-auto mb-8 overflow-hidden transition-shadow bg-white rounded-lg shadow-md group hover:shadow-lg">
          {featuredImage?.node?.sourceUrl && (
            <img
              className="object-cover w-full aspect-[5/2]"
              srcSet={featuredImage?.node?.srcSet}
              src={featuredImage?.node?.sourceUrl}
              alt={
                featuredImage?.node?.altText || `Featured Image for ${title}`
              }
            />
          )}

          <div className="p-6">
            <Link href={uri}>
              <a className="before:absolute before:inset-0">
                <h3 className="block mb-3 text-2xl font-black truncate transition-colors text-zinc-800 group-hover:text-indigo-600">
                  {title}
                  {isSticky && <span className="ml-2 text-indigo-600">★</span>}
                </h3>
              </a>
            </Link>
            {excerpt && (
              <div
                className="mb-8 text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            )}
            <div className="flex justify-end space-x-3">
              {categories?.nodes.length > 0 &&
                categories.nodes.map((category) => {
                  if (
                    category?.databaseId ===
                    wpSettings.writingSettingsDefaultCategory
                  )
                    return
                  return (
                    <Link href={category?.uri} key={category?.id}>
                      <a className="relative mb-2 text-xs font-medium text-indigo-600 uppercase hover:underline">
                        /{category?.name}
                      </a>
                    </Link>
                  )
                })}
              {tags?.nodes.length > 0 &&
                tags.nodes.map((tag) => {
                  return (
                    <Link href={tag?.uri} key={tag?.id}>
                      <a className="relative mb-2 text-xs font-medium text-indigo-600 uppercase hover:underline">
                        #{tag?.name}
                      </a>
                    </Link>
                  )
                })}
            </div>
            <div className="flex items-center">
              <Link href={author?.node.uri}>
                <a className="relative flex items-center text-gray-600 transition-colors hover:text-indigo-600 hover:underline">
                  <div className="mr-3 shrink-0">
                    {author?.node?.avatar?.url && (
                      <img
                        className="object-cover h-8 rounded-full"
                        src={author.node.avatar.url}
                        alt={`Avatar for ${author?.node?.name}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-xs font-medium">{author?.node?.name}</p>
                  </div>
                </a>
              </Link>

              <span className="ml-auto text-xs text-gray-600">
                {parse(
                  new Date(date),
                  `${phpDateTokensToUnicode(
                    wpSettings?.generalSettingsDateFormat
                  )} 'at' ${phpDateTokensToUnicode(
                    wpSettings?.generalSettingsTimeFormat
                  )}`,
                  new Date()
                ).toString()}
              </span>
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
  isSticky: PropTypes.bool,
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
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        uri: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
  categories: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        databaseId: PropTypes.number,
        uri: PropTypes.string,
        name: PropTypes.string,
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
    isSticky
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
      nodes {
        id
        uri
        name
      }
    }
    categories(first: 3) {
      nodes {
        id
        databaseId
        uri
        name
      }
    }
  }
`
