import babel from 'rollup-plugin-babel';

const baseConfig = {
  external: 'quill',
  input: 'src/index.js',
};

export default [
  {
    ...baseConfig,
    output: {
      file: 'dist/es.js',
      format: 'es'
    },
    plugins: [
      babel({
        plugins: [
          '@babel/plugin-proposal-class-properties',
        ]
      }),
    ]
  },
  {
    ...baseConfig,
    output: [
      {
        file: 'dist/es5m.js',
        format: 'es'
      },
      {
        file: 'dist/umd.js',
        format: 'umd',
        name: 'quillImageUploader',
        globals: {
          quill: 'Quill'
        }
      }
    ],
    plugins: [
      babel({
        presets: [
          ['@babel/preset-env', {
            modules: false,
            loose: true,
            targets: {
              browsers: ['last 3 versions', 'safari >= 7']
            }
          }]
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }),
    ]
  },
];
