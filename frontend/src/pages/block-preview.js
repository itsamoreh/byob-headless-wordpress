import displayBlock from '@/functions/wordpress/display-block'
import camelizeKeys from '@/lib/camelize-keys'
import Script from 'next/script'
import Head from 'next/head'

export default function Block({ block }) {
  return (
    <>
      <Head>
        <title>{`${block?.name} Preview Page`}</title>
        <meta
          name="description"
          content={`Preview the ${block?.name} block.`}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="iframe-resizer-content-window.js"
        // @see https://github.com/davidjbradshaw/iframe-resizer
      />
      <div>{displayBlock(block)}</div>
    </>
  )
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
