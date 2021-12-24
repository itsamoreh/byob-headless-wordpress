import displayBlock from '@/functions/wordpress/display-block'

export default function Block({ block }) {
  console.log(block)
  return <div>{displayBlock(block)}</div>
}

export async function getServerSideProps(context) {
  const block = context.query

  return {
    props: {
      block,
    },
  }
}
