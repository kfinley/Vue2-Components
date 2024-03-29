import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import { NotificationModule }  from "./store-modules";

let notificationModule: NotificationModule;

export function initializeModules(store: Store<any>): void {
  notificationModule = getModule(NotificationModule, store);
}

export { notificationModule };
