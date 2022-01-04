import PropTypes from 'prop-types'

import Head from '@/components/structure/Shell/Head'
import { WpSettingsContext } from '@/contexts/WpSettingsContext'
import { gql } from '@apollo/client'

export default function Shell({ wpSettings, seo, manualSeo, children }) {
  return (
    <>
      <WpSettingsContext.Provider value={wpSettings}>
        <Head seo={seo} manualSeo={manualSeo} />

        <span>NAVIGATION</span>

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
  link: PropTypes.string,
  menuItems: PropTypes.array,
  seo: PropTypes.object,
}

// Root Query Fragments
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
