import React from 'react'

export const WpSettingsContext = React.createContext({
  generalSettingsDateFormat: 'F j, Y',
  generalSettingsDescription: '',
  generalSettingsLanguage: '',
  generalSettingsStartOfWeek: 1,
  generalSettingsTimeFormat: 'g:i a',
  generalSettingsTimezone: '',
  generalSettingsTitle: '',
  readingSettingsPostsPerPage: 10,
  writingSettingsDefaultCategory: 1,
  writingSettingsDefaultPostFormat: '',
})
