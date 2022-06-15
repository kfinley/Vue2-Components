/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Vue from "vue";
import Vuex, { Store } from "vuex";
import { createLocalVue, mount, VueClass, RouterLinkStub, Wrapper } from "@vue/test-utils";
import { DefaultMethods } from "vue/types/options";

export function create(
  Component: VueClass<Vue>,
  propsData?: any | undefined,
  template?: string | undefined,
  methods?: DefaultMethods<Vue> | undefined,
  configureStore?: (store: any) => void | undefined,
  store?: Store<unknown> | undefined,
) {

  const localVue = createLocalVue();
  localVue.use(Vuex);

  store = store ?? new Vuex.Store({});

  store.dispatch = jest.fn();
  store.commit = jest.fn();

  configureStore?.(store);

  let comp!: Wrapper<Vue, Element>;

  if (template !== undefined) {
    comp = mount(Component, {
      template,
      propsData,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      },
      localVue,
      methods
    });
  } else {
    comp = mount(Component, {
      propsData,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      },
      localVue,
      methods
    });
  }

  return comp;
}

export async function createWithData(
  Component: VueClass<Vue>,
  data: any,
  propsData?: any,
  store?: Store<unknown>,
) {

  const comp = create(Component, propsData, undefined, undefined, undefined, store);

  await comp.setData(data);
  await comp.vm.$nextTick();

  return comp;
}

