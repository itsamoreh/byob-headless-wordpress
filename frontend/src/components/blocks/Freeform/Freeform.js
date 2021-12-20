import PropTypes from 'prop-types'

/**
 * Freeform Block
 *
 * The core Freeform Gutenberg block.
 */
export default function Freeform({ content }) {
  return (
    <div
      // tailwindcss-typography (prose) can be customized using the low-level customization API
      // @see https://github.com/tailwindlabs/tailwindcss-typography#customization
      className="container mb-8 prose prose-indigo"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

Freeform.propTypes = {
  content: PropTypes.string,
}

Freeform.defaultProps = {
  content: '',
}
