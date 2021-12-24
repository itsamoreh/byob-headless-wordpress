import displayBlock from '@/functions/wordpress/display-block'
import PropTypes from 'prop-types'

/**
 * Blocks Block
 *
 * Display all the Gutenberg blocks.
 */
export default function Blocks({ block }) {
  return displayBlock(block)
}

Blocks.propTypes = {
  block: PropTypes.object,
}
