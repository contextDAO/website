module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false };
    config.module.rules.push(
      {
        test: /\.pdf?$/i,
        type: 'asset/resource',
      },
      {
        test: /\.png$/i,
        type: 'asset/resource',
      },
    );
    return config;
  },
};
