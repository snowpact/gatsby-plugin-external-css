# gatsby-plugin-external-css

<a href="https://www.npmjs.com/package/gatsby-plugin-external-css">
<img src="https://img.shields.io/npm/v/gatsby-plugin-external-css.svg?style=popout" alt="Current npm package version" />
</a>
<a href="https://www.npmjs.com/package/gatsby-plugin-external-css">
<img src="https://img.shields.io/npm/dw/gatsby-plugin-external-css.svg?style=popout" alt="Downloads per month on npm." title="Downloads per month on npm." />
</a>


Add external custom css files to your generated html pages.

## Installation

```bash
npm install gatsby-plugin-external-css
```

or

```bash
yarn add gatsby-plugin-external-css
```

## Usage

This plugin lets you add a custom css file in your builded public index.html.
You probably don't need this as it's for very specific usage.

In my case, I'm generating different gatsby projects based on a config, and I'm providing a custom way to give a css file out of the src folder scope.

##### Add the following plugin to your `gatsby-config.js`

Create 

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-external-css',
      options: {
        source: 'full/local/path.css',
      },
    },
  ],
}
```
Be sure that the file exists.

The file will be copied into the final public file with a custom cache busting.
The css file will be appended at the last of the <head> meta.