module.exports = {
  default: {
    require: [
      'src/steps/**/*.ts',
      'src/support/**/*.ts'
    ],
       paths: ['features/**/*.feature'],  
    requireModule: ['ts-node/register'],
    format: ['progress']
  }
};
