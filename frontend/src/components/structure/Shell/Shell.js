import PropTypes from 'prop-types'

import Head from '@/components/structure/Shell/Head'
import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import { gql } from '@apollo/client'

import Navigation from './Navigation'

export default function Shell({
  wpSettings,
  seo,
  manualSeo,
  headerMenu,
  children,
}) {
  return (
    <>
      <WpSettingsContext.Provider value={wpSettings}>
        <Head seo={seo} manualSeo={manualSeo} />

        <Navigation menuItems={headerMenu} wpSettings={wpSettings} />

        {children}

        <span>FOOTER</span>
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
