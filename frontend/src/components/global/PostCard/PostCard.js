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
    <div className="container">
      <div className="max-w-2xl mx-auto mb-8 overflow-hidden bg-white rounded-lg shadow-md dark:bg-zinc-800">
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
              <h3 className="block text-2xl font-black text-zinc-800 dark:text-white hover:underline decoration-indigo-500">
                {title}
              </h3>
              {excerpt && (
                <div
                  className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                />
              )}
              {/* Footer */}
              <div className="flex items-center mt-4 space-x-2">
                <Link href={author.node.uri}>
                  <a className="flex items-center space-x-2">
                    <div className="shrink-0">
                      {author?.node?.avatar?.url && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={author.node.avatar.url}
                          alt={`Avatar for ${author?.node?.name}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-zinc-600 dark:text-white">
                        {author?.node?.name}
                      </p>
                    </div>
                  </a>
                </Link>
                <p className="flex-1 min-w-0 text-xs text-right truncate text-zinc-600 dark:text-zinc-400">
                  {date}
                </p>
              </div>
            </div>
          </a>
        </Link>
      </div>
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
