import NextHead from 'next/head'
import PropTypes from 'prop-types'

import { gql } from '@apollo/client'

export default function Head({ seo, manualSeo }) {
  return (
    <NextHead>
      <link rel="icon" href="/favicon.ico" />

      {seo && (
        <>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <link rel="canonical" href={seo.canonicalUrl} />
          <meta property="og:url" content={seo.canonicalUrl} />
          <meta property="og:title" content={seo.openGraphTitle} />
          <meta property="og:type" content={seo.openGraphType} />
          <meta property="og:description" content={seo.openGraphDescription} />
          {seo?.socialImage?.sourceUrl && (
            <>
              <meta property="og:image" content={seo.socialImage.sourceUrl} />
              <meta
                name="twitter:image:alt"
                content={seo.socialImage.altText ?? ''}
              />
            </>
          )}
          <meta name="twitter:card" content="summary_large_image" />
        </>
      )}
      {!seo && manualSeo && (
        <>
          <title>{`${manualSeo.title}`}</title>
          <meta name="description" content={manualSeo.description} />
        </>
      )}
    </NextHead>
  )
}

Head.propTypes = {
  seo: PropTypes.shape({
    canonicalUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    openGraphDescription: PropTypes.string.isRequired,
    openGraphTitle: PropTypes.string.isRequired,
    openGraphType: PropTypes.string.isRequired,
    socialImage: PropTypes.shape({
      altText: PropTypes.string,
      sourceUrl: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
  }),
  manualSeo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
}

export const POST_SEO_FIELDS = gql`
  fragment PostSeoFields on Post {
    seo {
      canonicalUrl
      description
      openGraphDescription
      openGraphTitle
      openGraphType
      socialImage {
        altText
        sourceUrl
      }
      title
      twitterDescription
      twitterTitle
    }
  }
`
