// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};