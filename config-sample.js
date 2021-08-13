const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    secrets: {
        session: 'your-secret'
    }
  },
  production: {
    secrets: {
        session: 'your-secret'
    }
  },
};

module.exports = config[env];
