import { gql } from '@apollo/client'
import PropTypes from 'prop-types'

/**
 * Call to Action Block
 *
 * The ACF Call to Action Gutenberg block.
 */
export default function CallToAction({
  headingCall,
  headingQuestion,
  primaryCta,
  secondaryCta,
}) {
  return (
    <div className="mb-8 bg-indigo-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          <span className="block">{headingQuestion ?? ''}</span>
          <span className="block text-indigo-600">{headingCall ?? ''}</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href={primaryCta?.url ?? ''}
              target={primaryCta?.target ?? ''}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              {primaryCta?.title ?? ''}
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href={secondaryCta?.url ?? ''}
              target={secondaryCta?.target ?? ''}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50"
            >
              {secondaryCta?.title ?? ''}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

CallToAction.propTypes = {
  headingCall: PropTypes.string,
  headingQuestion: PropTypes.string,
  primaryCta: PropTypes.shape({
    target: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  secondaryCta: PropTypes.shape({
    target: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
}

export const CALL_TO_ACTION_FIELDS = gql`
  fragment CallToActionFields on AcfByobCallToActionBlock {
    name
    acfAttributes {
      headingCall
      headingQuestion
      primaryCta {
        target
        title
        url
      }
      secondaryCta {
        target
        title
        url
      }
    }
  }
`
