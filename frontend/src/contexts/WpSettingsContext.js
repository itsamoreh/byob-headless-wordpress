import React from 'react'

export const WpSettingsContext = React.createContext({
  generalSettingsDateFormat: 'F j, Y',
  generalSettingsDescription: 'Just another WordPress site',
  generalSettingsStartOfWeek: 1,
  generalSettingsTimeFormat: 'g:i a',
  generalSettingsTimezone: 'America/Toronto',
  generalSettingsTitle: 'BYOB',
  readingSettingsPostsPerPage: 10,
  writingSettingsDefaultCategory: 1,
})
