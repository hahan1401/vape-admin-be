module.exports = {
  apps: [
    {
      name: 'vape-admin-be',
      script: './dist/main.js',
      exec_mode: 'cluster',
      instances: 'max',
    },
  ],
};
