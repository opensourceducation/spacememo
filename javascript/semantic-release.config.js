module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
  // Añade esta opción para que "semantic-release" utilice la variable de entorno GITHUB_TOKEN para autenticarse con GitHub
  github: {
    type: 'oauth',
    token: process.env.GITHUB_TOKEN,
  },
};