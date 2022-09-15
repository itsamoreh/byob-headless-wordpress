import cn from 'classnames'
import { trimEnd } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function Navigation({ menuItems, wpSettings }) {
  const { title } = wpSettings

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="container z-50 mb-12 flex flex-wrap items-center justify-between bg-transparent p-6">
      <div className="z-50 mr-6 flex flex-shrink-0 items-center">
        <Link href="/">
          <a>
            <span className="text-xl font-black tracking-tight text-indigo-600">
              {title}
            </span>
          </a>
        </Link>
      </div>
      <div className="z-50 block lg:hidden">
        <button
          className={cn(
            'flex items-center px-3 py-2 text-indigo-600 hover:opacity-80'
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={cn(
          'absolute inset-0 block w-full flex-grow bg-white px-6 pt-[4.75rem]',
          'lg:static lg:mt-0 lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:px-0 lg:pt-0',
          mobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="lg:flex lg:flex-grow">
          {menuItems &&
            menuItems.map((item, n) => (
              <Link key={n} href={item.path} target={item.target || ''}>
                <a className="text-md group mt-4 mr-4 block font-medium text-indigo-600 transition-opacity duration-500 lg:mt-0">
                  <span
                    className={cn(
                      'link-underline link-underline-indigo-600 opacity-80 group-hover:opacity-100',
                      // Underline the current link.
                      router.asPath === trimEnd(item.path, '/') &&
                        'link-underline-current opacity-100'
                    )}
                  >
                    {item.label}
                    {router.asPath === trimEnd(item.path, '/')}
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

export const NAVIGATION_MENU = `
  navigationMenu: menus(where: { location: HEADER }) {
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
