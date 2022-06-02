import '!style-loader!css-loader!sass-loader!../node_modules/bootstrap/dist/css/bootstrap.css';

//TODO import '!style-loader!css-loader!sass-loader!xxxxx/src/styles/styles.scss';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
