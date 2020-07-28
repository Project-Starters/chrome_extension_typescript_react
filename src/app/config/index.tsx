const dev = {
  firebaseConfig: {
    /**
     * INSERT YOUR FIREBASE CONFIG HERE
     */
  },
};

export const mode = 'prod'

const prod = dev;

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  ...config
};