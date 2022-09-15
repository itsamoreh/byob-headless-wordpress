import { gql } from '@apollo/client'
import NextHead from 'next/head'
import PropTypes from 'prop-types'

export default function Head({ seo, manualSeo }) {
  return (
    <NextHead>
      {
        // @see https://realfavicongenerator.net/
        // prettier-ignore
        <>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4f46e5" />
          <meta name="msapplication-TileColor" content="#603cba" />
          <meta name="theme-color" content="#4f46e5" />
        </>
      }
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

const SEO_FIELDS = `
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
`

export const PAGE_SEO_FIELDS = gql`
  fragment PageSeoFields on Page {
    ${SEO_FIELDS}
  }
`

export const POST_SEO_FIELDS = gql`
  fragment PostSeoFields on Post {
    ${SEO_FIELDS}
  }
`

export const CATEGORY_SEO_FIELDS = gql`
  fragment CategorySeoFields on Category {
    ${SEO_FIELDS}
  }
`

export const TAG_SEO_FIELDS = gql`
  fragment TagSeoFields on Tag {
    ${SEO_FIELDS}
  }
`
