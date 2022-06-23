import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";

describe("fat-toggle.vue", () => {

  let component: Wrapper<Vue, Element>;

  beforeEach(() => {
    // Arrange
    component = Factory.create(Components.FatToggle, {
      id: '54224a7f-eca5-47f9-ada5-bec922b849d9',
      checked: false
    });

  });

  it("mounts", () => {

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  });
});
