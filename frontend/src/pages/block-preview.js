import displayBlock from '@/functions/wordpress/display-block'
import camelizeKeys from '@/lib/camelize-keys'

export default function Block({ block }) {
  return <div>{displayBlock(block)}</div>
}

export async function getServerSideProps(context) {
  const block = context.query

  if (block?.acfAttributes) {
    block.acfAttributes = camelizeKeys(JSON.parse(block.acfAttributes))
  }

  return {
    props: {
      block,
    },
  }
}
