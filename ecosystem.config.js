module.exports = {
  apps: [
    {
      name: 'appjam-backend',
      script: './index.ts',
      env: {
        NODE_ENV: 'production'
      },
      watch: 'true'
    }
  ]
};
