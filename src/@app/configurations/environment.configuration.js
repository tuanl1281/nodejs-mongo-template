const isDevelopment = true;
const port = 3000;

// #region --- Database ---
const mongodb = {
  url: 'mongodb+srv://fr1d4y:VDVdZVVbcr1i2vOl@fr1d4y.jv3ty34.mongodb.net/user_management',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
}
// #endregion

export {
  isDevelopment,
  port,
  mongodb
}

export default {
  isDevelopment,
  port,
  mongodb
};