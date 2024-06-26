const whiteList = ['http://127.0.0.1', 'http://localhost:5173'];
export const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // TODO: before moving to production update whitelist and remove || !origin
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
