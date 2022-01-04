import React from 'react'

export const WpSettingsContext = React.createContext({
  dateFormat: 'F j, Y',
  description: 'Just another WordPress site',
  startOfWeek: 1,
  timeFormat: 'g:i a',
  timezone: 'America/Toronto',
  title: 'BYOB',
  postsPerPage: 10,
  defaultCategory: 1,
})
