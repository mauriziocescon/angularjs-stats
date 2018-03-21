function buildConfig(env) {
  return require('./config/' + env.name + '.js')(env);
}

module.exports = buildConfig;
