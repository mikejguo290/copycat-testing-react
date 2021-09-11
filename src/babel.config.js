module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
  };
};


/*
module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      ['@babel/preset-react', {targets: {node: 'current'}}] // add this
    ]
  };
*/