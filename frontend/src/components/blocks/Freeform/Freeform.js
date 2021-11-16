import PropTypes from 'prop-types'
import styles from './Freeform.module.css'
import cn from 'classnames'

/**
 * Freeform Block
 *
 * The core Freeform Gutenberg block.
 */
export default function Freeform({ content }) {
  return (
    <div
      className={cn(styles.freeform)}
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
