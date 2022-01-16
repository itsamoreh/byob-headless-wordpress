import cn from 'classnames'
import { trimEnd } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export default function Navigation({ menuItems, wpSettings }) {
  const router = useRouter()
  const { title } = wpSettings
  return (
    <nav className="container z-50 flex flex-wrap items-center justify-between p-6 mb-12 bg-transparent">
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link href="/">
          <a>
            <span className="text-xl font-black tracking-tight text-indigo-600">
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
                <a className="block mt-4 mr-4 font-medium text-indigo-600 transition-opacity duration-500 text-md lg:inline-block lg:mt-0 group">
                  <span
                    className={cn(
                      'opacity-80 link-underline link-underline-indigo-600 group-hover:opacity-100',
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
