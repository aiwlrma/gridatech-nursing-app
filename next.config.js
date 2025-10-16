/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: false,
  },
  webpack: (config, { isServer }) => {
    // React Native Web 설정
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      '@expo/vector-icons': false,
      'expo-linear-gradient': false,
      'react-native-reanimated': false,
      'react-native-safe-area-context': false,
      'expo-status-bar': false,
      'react-native-gesture-handler': false,
      'react-native-svg': false,
    };

    // SVG 처리
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // 폰트 파일 처리
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
        },
      },
    });

    // 네이티브 모듈 폴리필
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // 문제가 되는 모듈들을 externals로 처리
    config.externals = config.externals || [];
    config.externals.push({
      '@expo/vector-icons': 'commonjs @expo/vector-icons',
      'expo-linear-gradient': 'commonjs expo-linear-gradient',
      'react-native-reanimated': 'commonjs react-native-reanimated',
      'react-native-safe-area-context': 'commonjs react-native-safe-area-context',
      'expo-status-bar': 'commonjs expo-status-bar',
      'react-native-gesture-handler': 'commonjs react-native-gesture-handler',
      'react-native-svg': 'commonjs react-native-svg',
    });

    return config;
  },
  // 정적 파일 서빙
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: '/static/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
