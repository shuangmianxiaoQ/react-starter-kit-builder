// `webpack`和程序热加载时的全局变量
global.__TEST__ = process.env.NODE_ENV === 'test';
global.__DEV__ = process.env.NODE_ENV === 'development';
global.__PROD__ = process.env.NODE_ENV === 'production';
global.__NODE_ENV__ = process.env.NODE_ENV;
global.__PORT__ = process.env.PORT;
