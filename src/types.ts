import { PluginFunction, PluginObject } from "vue";
import { ClientPluginOptions } from './plugin';

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

export interface ClientPlugin extends PluginObject<ClientPluginOptions> {
  install: PluginFunction<ClientPluginOptions>;
}
