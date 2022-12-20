import Vue, { PluginFunction, PluginObject } from "vue";
import * as components from './components';
import NotificationModule from "./store/notification-module";
import { Store } from "vuex";
import router from "vue-router";
import { getModule } from "vuex-module-decorators";

export interface ComponentsPlugin extends PluginObject<ComponentLibraryPluginOptions> {
  install: PluginFunction<ComponentLibraryPluginOptions>;
}

export interface ComponentLibraryPluginOptions {
  router: router;
  store: Store<any>;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupModules = (store: Store<any>): void => {
  console.log('registering vue2-components modules')
  store.registerModule("NotificationModule", NotificationModule);
};


const ComponentLibraryPlugin = {
  install(vue: typeof Vue, options?: ComponentLibraryPluginOptions) {
    Object.keys(components).forEach(name => {
      vue.component(name, (<any>components)[name]);
    });
    if (options !== undefined && options.store) {
      setupModules(options.store);

      options.router.beforeEach((to, from, next) => {
        getModule(NotificationModule, options.store).dismissAll();
        next();
      });
    }
  }
};

export default ComponentLibraryPlugin;
