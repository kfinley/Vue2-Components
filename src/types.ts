import { PluginFunction, PluginObject } from "vue";
import { ClientPluginOptions } from "./plugin";

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

export type NotificationType = "alert" | "error" | "success";

export interface Notification {
  header?: string;
  message: string;
  type: NotificationType;
  timed?: boolean;
  delay?: number;
}

export interface HandleErrorParams {
  error: any;
  rethrow: boolean;
}

export interface ClientPlugin extends PluginObject<ClientPluginOptions> {
  install: PluginFunction<ClientPluginOptions>;
}
