import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";

describe("flat-modal.vue", () => {

  let component: Wrapper<Vue, Element>;

  beforeEach(() => {
    // Arrange
    component = Factory.create(Components.FlatModal
    );
  });

  it("mounts", () => {

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  });
});
