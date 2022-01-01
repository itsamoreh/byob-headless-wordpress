import '@/styles/globals.css'

import NextNProgress from 'nextjs-progressbar'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../tailwind.config'

const colors = resolveConfig(tailwindConfig).theme.colors

function MyApp({ Component, pageProps = {} }) {
  return (
    <>
      <NextNProgress color={colors.indigo[600]} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
