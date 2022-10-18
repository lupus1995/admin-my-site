import path from 'path';

// игнорируем импорты `.scss`
require('ignore-styles').default(['.sass', '.scss']);

// транспилируем на лету импорты
require('@babel/register')({
  configFile: path.resolve(__dirname, '../../babel.config.js'),
});

require('./express.js');
