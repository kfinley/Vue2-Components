
import { useArgs } from '@storybook/client-api'
import { setupValidation } from './../src/components/validation';
import { extend } from 'vee-validate';

import '!style-loader!css-loader!sass-loader!../node_modules/bootstrap/dist/css/bootstrap.css';

//TODO import '!style-loader!css-loader!sass-loader!xxxxx/src/styles/styles.scss';

setupValidation(extend);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

//ht: https://craigbaldwin.com/blog/updating-args-storybook-vue/
export const decorators = [
  (story, context) => {
    const [_, updateArgs] = useArgs();
    return story({ ...context, updateArgs });
  },
]
