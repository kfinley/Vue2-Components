import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";

describe("valid-input.vue", () => {

  let component: Wrapper<Vue, Element>;

  beforeEach(() => {
    // Arrange
    component = Factory.create(Components.ValidInput);

  });

  it("mounts", () => {

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  });
});
