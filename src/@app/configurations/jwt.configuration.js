const secret = 'SECRET_NODE_MONGO_TEMPLATE';
const refreshSecret = 'REFRESH_SECRET_NODEJS_MONGODB_TEMPLATE';

const tokenExpired = 2 * 60 * 60; // seconds
const refreshTokenExpired = 7 * 24 * 60 * 60 * 60; // seconds

export { secret, refreshSecret, tokenExpired, refreshTokenExpired };
export default { secret, refreshSecret, tokenExpired, refreshTokenExpired };
