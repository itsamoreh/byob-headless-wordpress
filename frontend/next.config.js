module.exports = {
  async rewrites() {
    return [
      {
        source: '/wp-admin/:path*',
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-admin/:path*`,
      },
    ]
  },
  experimental: {
    scrollRestoration: true,
  },
}
