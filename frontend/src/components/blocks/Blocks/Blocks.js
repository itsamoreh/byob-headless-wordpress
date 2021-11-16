import displayBlock from '@/functions/wordpress/display-block'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * Blocks Block
 *
 * Display all the Gutenberg blocks.
 */
export default function Blocks({ blocks }) {
  return (
    <>
      {
        // If there are blocks, loop over and display them.
        !!blocks?.length &&
          blocks.map((block, index) => {
            return displayBlock(block, index)
          })
      }
    </>
  )
}

Blocks.propTypes = {
  blocks: PropTypes.array.isRequired,
}

Blocks.defaultProps = {
  blocks: [],
}
