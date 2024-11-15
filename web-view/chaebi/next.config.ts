import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
        },
      },
    })

    return config
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://k11a309.p.ssafy.io:8080/api/:path*',
      },
    ]
  },
}

export default nextConfig
