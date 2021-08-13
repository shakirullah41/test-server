const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    secrets: {
        session: 'hmp-ordering-api-secret'
    }
  },
  production: {
    secrets: {
        session: 'hmp-ordering-api-secret'
    }
  },
};

module.exports = config[env];
