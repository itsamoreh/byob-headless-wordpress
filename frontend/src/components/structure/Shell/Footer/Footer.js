import cn from 'classnames'
import { trimEnd } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export default function Footer({ menuItems, wpSettings }) {
  const router = useRouter()
  const { title } = wpSettings
  return (
    <nav className="flex flex-wrap items-center justify-between p-6 mt-16 bg-indigo-100 bg-block-pattern">
      <div className="container">
        <div className="flex items-center flex-shrink-0 mb-6">
          <Link href="/">
            <a>
              <span className="text-xl font-black tracking-tight text-indigo-600">
                {title}
              </span>
            </a>
          </Link>
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
      </div>
    </nav>
  )
}

Footer.propTypes = {
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

export const FOOTER_MENU = `
  footerMenu: menus(where: { location: FOOTER }) {
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
