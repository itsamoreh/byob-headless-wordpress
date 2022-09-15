import { gql } from '@apollo/client'
import PropTypes from 'prop-types'
import wpautop from 'wpautop'

import parseHtml from '@/lib/html-parser'

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
      className="container prose prose-indigo mb-8"
    >
      {parseHtml(wpautop(content))}
    </div>
  )
}

Freeform.propTypes = {
  content: PropTypes.string,
}

Freeform.defaultProps = {
  content: '',
}

export const FREEFORM_FIELDS = gql`
  fragment FreeformFields on CoreFreeformBlock {
    name
    attributes {
      content
    }
  }
`
