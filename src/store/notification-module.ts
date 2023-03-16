import { AlertType, Notification, HandleErrorParams, NotificationType } from "./../types";
import { Module, Mutation, Action } from "vuex-module-decorators";
import BaseModule from "./base-module";
import { NotificationState } from "./state";

@Module({ namespaced: true, name: "Notification" })
export default class NotificationModule
  extends BaseModule
  implements NotificationState
{
  notifications: Notification[] = [];

  @Action
  setSuccess(params: { header?: string; message: string }) {
    this.context.commit("add", {
      ...params,
      type: "success",
    });
  }

  @Action
  setError(params: { header?: string; message: string }) {
    this.context.commit("add", {
      ...params,
      type: "error",
    });
  }

  @Mutation
  handleError (params: HandleErrorParams) {
    //console.log(params.error);

    this.notifications.push({
      header: "Error",
      message: params.error.message !== undefined ? params.error.message : params.error,
      type: "error",
    });

    if (params.rethrow) {
      throw params.error;
    }
  }

  @Mutation
  add(params: { header?: string; message: string; type: NotificationType }) {
    this.notifications.push({
      header: params.header,
      message: params.message,
      type: params.type,
    });
  }

  @Mutation
  dismiss(index: number) {
    this.notifications.splice(index, 1);
  }

  @Mutation
  dismissAll() {
    this.notifications = [];
  }
}
