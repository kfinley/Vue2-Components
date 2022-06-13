import Components from "@/components";
import { Factory } from "../utils";

describe("type-ahead.vue", () => {

  it("mounts", () => {

    // Arrange
    const component = Factory.create(Components.TypeAhead);

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  })
})
