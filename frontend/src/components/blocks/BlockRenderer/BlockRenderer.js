import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * Block Renderer
 *
 * Render all of the Gutenberg blocks that make up the page.
 */
export default function BlockRenderer({ blocks }) {
  return (
    <>
      {
        // If there are blocks, loop over and display them.
        !!blocks?.length &&
          blocks.map((block, index) => {
            const { acfAttributes, attributes, name } = block

            // prettier-ignore
            switch (name) {

              case 'core/freeform':
                const Freeform = dynamic(() => import("@/components/blocks/Freeform"));
                return <Freeform {...attributes} key={index} />

              case 'acf/byob-call-to-action':
                const CallToAction = dynamic(() => import("@/components/blocks/CallToAction"));
                return <CallToAction {...acfAttributes} key={index} />

              default:
                return <pre key={index}>{JSON.stringify(block, null, 2)}</pre>
          }
          })
      }
    </>
  )
}

BlockRenderer.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      attributes: PropTypes.object,
      acfAttributes: PropTypes.object,
    })
  ),
}

BlockRenderer.defaultProps = {
  blocks: [],
}
