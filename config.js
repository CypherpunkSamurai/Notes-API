const env = process.env;

// Configuration
const POSTGRESQL_CONFIG_URL = env.POSTGRESQL_CONFIG_URL || "";

module.exports = { POSTGRESQL_CONFIG_URL };