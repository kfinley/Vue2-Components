import Vue from "vue";
// import * as components from './components';
import NotificationModule from "./store/notification-module";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import { ClientPlugin, ClientPluginOptions } from './types';
import { Container } from "inversify-props";
import { initializeModules, notificationModule } from "./store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupModules = (store: Store<any>, container: Container): void => {
  console.log('registering vue2-components modules')
  store.registerModule("Notification", NotificationModule);

  initializeModules(store);

  container.bind<NotificationModule>("NotificationModule").toDynamicValue(() => notificationModule);

};

const ComponentLibraryPlugin: ClientPlugin = {
  install(vue: typeof Vue, options?: ClientPluginOptions) {

    // This blows up with mixins not being loaded yet.

    // Object.keys(components).forEach(name => {
    //   vue.component(name, (<any>components)[name]);
    // });

    if (options !== undefined && options.store) {
      setupModules(options.store, options.container);

      options.router.beforeEach((to, from, next) => {
        getModule(NotificationModule, options.store).dismissAll();
        next();
      });
    }
  }
};

export default ComponentLibraryPlugin;
