module.exports = {
  cacheDirectory: '<rootDir>/.tmp/jest',
  coverageDirectory: './.tmp/coverage',
  moduleNameMapper: { '^.+\\.(css|scss|cssmodule)$': 'identity-obj-proxy' },
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: { NODE_ENV: 'test' },
  verbose: true,
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/mocks/.*'],
  coveragePathIgnorePatterns: ['typings.d.ts'],
  transformIgnorePatterns: ['.*(node_modules).*$'],
  transform: {
    // 测试运行期间将原始代码转换为`ES5`
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/setupTests.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'] // 为运行的每个测试文件创建快照
};
