import PropTypes from 'prop-types'
import wpautop from 'wpautop'

import parseHtml from '@/lib/html-parser'
import { gql } from '@apollo/client'

/**
 * Freeform Block
 *
 * The core Freeform Gutenberg block.
 */
export default function Freeform({ content }) {
  console.log(content)
  return (
    <div
      // tailwindcss-typography (prose) can be customized using the low-level customization API
      // @see https://github.com/tailwindlabs/tailwindcss-typography#customization
      className="container mb-8 prose prose-indigo"
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
