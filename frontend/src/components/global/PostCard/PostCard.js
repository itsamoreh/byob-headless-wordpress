import PropTypes from 'prop-types'
import React from 'react'
import Link from 'next/link'

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
}) {
  return (
    <div className="max-w-2xl mx-auto mb-8 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <Link href={uri}>
        <a>
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
            <h3 className="block text-2xl font-black text-gray-800 dark:text-white hover:text-gray-600 hover:underline">
              {title}
            </h3>
            {excerpt && (
              <div
                className="mt-2 text-sm text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            )}
            {/* Footer */}
            <div className="flex items-center mt-4 space-x-2">
              <Link href={author.node.uri}>
                <a className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    {author?.node?.avatar?.url && (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={author.node.avatar.url}
                        alt={`Avatar for ${author?.node?.name}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {author?.node?.name}
                    </p>
                  </div>
                </a>
              </Link>
              <p className="flex-1 min-w-0 text-xs text-right text-gray-500 truncate dark:text-gray-400">
                {date}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
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
  }
`
