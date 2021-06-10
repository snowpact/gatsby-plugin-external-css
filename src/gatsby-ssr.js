import path from 'path';
import React from 'react';
import fsExtra from 'fs-extra';
import { v1 as uuidv1 } from 'uuid';

const COMPONENT_KEY = 'custom-css';

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const {
    plugins, // internal to gatsby
    source, // source of the script
    ...options
  } = pluginOptions;

  if (!source) {
    throw new Error(
      'gatsby-plugin-external-css needs a "source" option in order to work correctly',
    );
  }

  const sourceNormalized = path.normalize(source);

  const basename = path.basename(sourceNormalized);

  const fileExists = fsExtra.pathExistsSync(sourceNormalized);
  const isFile = fsExtra.statSync(sourceNormalized).isFile();
  const isCssExtension = path.extname(basename) === '.css';

  if (!fileExists || !isFile || !isCssExtension) {
    throw new Error(
      'gatsby-plugin-external-css needs a "source" option that exists and that is a css file',
    );
  }

  try {
    const newPath = path.join(process.cwd(), 'public', basename);
    fsExtra.copySync(sourceNormalized, newPath);
  } catch (error) {
    throw new Error('gatsby-plugin-external-css could not copy the file into the public folder');
  }

  // Adding custom cache busting
  const pathWithCacheBusting = `${basename}?cb=${uuidv1()}`;
  setHeadComponents([
    <link key={COMPONENT_KEY} rel="stylesheet" type="text/css" href={pathWithCacheBusting} />,
  ]);
};

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();

  // Reordering the files so custom css is at the end
  const orderedComponents = headComponents.sort((item) => (item.key === COMPONENT_KEY ? 1 : -1));
  replaceHeadComponents(orderedComponents);
};
