const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeUselessStrokeAndFill: false,
          cleanupIds: false,
        },
      },
    },
    'removeXMLProcInst',
    'removeXMLNS',
    'removeDimensions',
    'minifyStyles',
    'removeComments',
    'removeHiddenElems',
    'removeEmptyAttrs',
    'removeEmptyText',
    'removeEmptyContainers',
    'collapseGroups',
    'removeMetadata',
    {
      name: 'convertPathData',
      params: {
        floatPrecision: 2,
      },
    },
  ],
};

export default svgoConfig;
