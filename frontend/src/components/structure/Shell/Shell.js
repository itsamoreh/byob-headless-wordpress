import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import Head from '@/components/structure/Shell/Head'
import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import { gql } from '@apollo/client'

import Footer from './Footer/Footer'
import Navigation from './Navigation'

export default function Shell({
  wpSettings,
  seo,
  manualSeo,
  headerMenu,
  footerMenu,
  children,
}) {
  const router = useRouter()
  const routeTransition = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  }

  return (
    <>
      <WpSettingsContext.Provider value={wpSettings}>
        <Head seo={seo} manualSeo={manualSeo} />

        <div className="flex flex-col min-h-screen">
          <Navigation menuItems={headerMenu} wpSettings={wpSettings} />

          <motion.div key={`${router.asPath}-children`} {...routeTransition}>
            {children}
          </motion.div>
          <motion.div
            className="mt-auto"
            key={`${router.asPath}-footer`}
            {...routeTransition}
          >
            <Footer menuItems={footerMenu} wpSettings={wpSettings} />
          </motion.div>
        </div>
      </WpSettingsContext.Provider>
    </>
  )
}

Shell.propTypes = {
  wpSettings: PropTypes.shape({
    dateFormat: PropTypes.string,
    description: PropTypes.string,
    startOfWeek: PropTypes.number,
    timeFormat: PropTypes.string,
    timezone: PropTypes.string,
    title: PropTypes.string,
    postsPerPage: PropTypes.number,
    defaultCategory: PropTypes.number,
  }),
  seo: PropTypes.object,
  manualSeo: PropTypes.object,
  headerMenu: PropTypes.array,
  footerMenu: PropTypes.array,
  children: PropTypes.node,
}

export const WP_SETTINGS_FIELDS = gql`
  fragment WpSettingsFields on Settings {
    dateFormat: generalSettingsDateFormat
    description: generalSettingsDescription
    startOfWeek: generalSettingsStartOfWeek
    timeFormat: generalSettingsTimeFormat
    timezone: generalSettingsTimezone
    title: generalSettingsTitle
    postsPerPage: readingSettingsPostsPerPage
    defaultCategory: writingSettingsDefaultCategory
  }
`
