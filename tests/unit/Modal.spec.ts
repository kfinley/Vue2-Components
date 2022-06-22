import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";

describe("modal.vue", () => {

  let component: Wrapper<Vue, Element>;

  beforeEach(() => {
    // Arrange
    component = Factory.create(Components.Modal
    );
  });

  it("mounts", () => {

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  });
});
