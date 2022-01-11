import Link from 'next/link'
import PropTypes from 'prop-types'

import { gql } from '@apollo/client'

export default function Navigation({ menuItems, wpSettings }) {
  const { title } = wpSettings

  return (
    <nav className="container flex flex-wrap items-center justify-between h-20 p-6 bg-transparent">
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link href="/">
          <a>
            <span className="text-xl font-black tracking-tight text-indigo-600 link-underline link-underline-indigo-600">
              {title}
            </span>
          </a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 text-indigo-600 hover:opacity-80">
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
        <div className="lg:flex-grow">
          {menuItems &&
            menuItems.map((item, n) => (
              <Link key={n} href={item.path} target={item.target || ''}>
                <a className="block mt-4 mr-4 font-medium text-indigo-600 transition-opacity duration-500 text-md lg:inline-block lg:mt-0 text-opacity-80 hover:text-opacity-100">
                  <span className="link-underline link-underline-indigo-600">
                    {item.label}
                  </span>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      target: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  wpSettings: PropTypes.shape({
    title: PropTypes.string,
  }),
}

export const NAVIGATION_FIELDS = `
  headerMenu: menus(where: { location: HEADER }) {
    edges {
      node {
        menuItems {
          nodes {
            label
            path
            target
          }
        }
      }
    }
  }
`
