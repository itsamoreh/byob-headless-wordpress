import cn from 'classnames'
import { trimEnd } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export default function Footer({ menuItems, wpSettings }) {
  const router = useRouter()
  const { title } = wpSettings
  return (
    <nav className="bg-block-pattern mt-16 flex flex-wrap items-center justify-between bg-indigo-100 p-6">
      <div className="container">
        <div className="mb-6 flex flex-shrink-0 items-center">
          <Link href="/">
            <a>
              <span className="text-xl font-black tracking-tight text-indigo-600">
                {title}
              </span>
            </a>
          </Link>
        </div>
        <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
          <div className="lg:flex-grow">
            {menuItems &&
              menuItems.map((item, n) => (
                <Link key={n} href={item.path} target={item.target || ''}>
                  <a className="text-md group mt-4 mr-4 block font-medium text-indigo-600 transition-opacity duration-500 lg:mt-0 lg:inline-block">
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
