import { PluginFunction, PluginObject } from "vue";
import { Store } from "vuex";
import router from "vue-router";
import { Container } from "inversify-props";

export enum AlertType {
  danger = "danger",
  dark = "dark",
  info = "info",
  light = "light",
  primary = "primary",
  secondary = "secondary",
  success = "success",
  warning = "warning",
}

export interface Notification {
  header?: string;
  message: string;
  type: AlertType;
}

export interface HandleErrorParams {
  error: any;
  rethrow: boolean;
}

export interface ClientPluginOptions {
  appName: string;
  router: router;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: Store<any>;
  container: Container;
}

export interface ClientPlugin extends PluginObject<ClientPluginOptions> {
  install: PluginFunction<ClientPluginOptions>;
}
