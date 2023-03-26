<template>
  <span class="install-popup" v-if="showInstall">
    <button
      type="button"
      class="clickable btn-close mt-2 me-2"
      style="position: absolute; top: -7px; right: -7px; font-size: 10px"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click.prevent="close"
    ></button
    >For the best experience install this app on your iPhone. Tap
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmlvbmljb25zLXY1LWY8L3RpdGxlPjxwYXRoIGQ9Ik0zMzYsMTkyaDQwYTQwLDQwLDAsMCwxLDQwLDQwVjQyNGE0MCw0MCwwLDAsMS00MCw0MEgxMzZhNDAsNDAsMCwwLDEtNDAtNDBWMjMyYTQwLDQwLDAsMCwxLDQwLTQwaDQwIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzJweCIvPjxwb2x5bGluZSBwb2ludHM9IjMzNiAxMjggMjU2IDQ4IDE3NiAxMjgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDozMnB4Ii8+PGxpbmUgeDE9IjI1NiIgeTE9IjMyMSIgeDI9IjI1NiIgeTI9IjQ4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MzJweCIvPjwvc3ZnPg=="
      width="20"
      height="20"
    />
    and then Add to Home Screen.</span
  >
</template>

<script lang="ts">
import BaseControl from "./base-control";
import { Component } from "vue-property-decorator";

@Component({})
export default class AddToHomeScreen extends BaseControl {
  showInstall = false;

  mounted() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.showInstall = true;
    }
  }

  close() {
    this.showInstall = false;
  }
}
</script>

<style lang="scss" scoped>
span.install-popup {
  position: fixed;
  bottom: 1em;
  width: 80%;
  left: 10%;
  height: 70px;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  color: $body-color;
  background: rgb(255, 255, 255);
  border: 1px solid $color--grey60;
  border-radius: 5px;
  text-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px 0px;
}

span.install-popup:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-width: 12px;
  border-style: solid;
  border-color: #ffffff transparent transparent transparent;
  top: 68px;
  left: 46.3%;
}
</style>
