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
    <div className="mb-8 bg-gray-50">
      <div className="max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">{headingQuestion ?? ''}</span>
          <span className="block text-indigo-600">{headingCall ?? ''}</span>
        </h2>
        <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href={primaryCta?.url ?? ''}
              target={primaryCta?.target ?? ''}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              {primaryCta?.title ?? ''}
            </a>
          </div>
          <div className="inline-flex ml-3 rounded-md shadow">
            <a
              href={secondaryCta?.url ?? ''}
              target={secondaryCta?.target ?? ''}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50"
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
    title: PropTypes.string,
    url: PropTypes.string,
    target: PropTypes.string,
  }),
  secondaryCta: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    target: PropTypes.string,
  }),
}
