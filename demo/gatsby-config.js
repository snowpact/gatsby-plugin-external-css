require('dotenv').config({
  path: `.env`,
});

module.exports = {
  plugins: [
    {
      resolve: require.resolve(`../`), // This create the module from precedent
      // resolve: 'gatsby-plugin-external-css', // This is when it's deployed
      options: {
        source: `${__dirname}/style.css`,
      },
    },
  ],
};
