import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";

describe("toggle.vue", () => {

    let component: Wrapper<Vue, Element>;

    beforeEach(() => {
        // Arrange
        component = Factory.create(Components.Toggle, {
          id: 'ec0bbf08-aabc-4984-b758-3ba32cd21335',
          checked: false
        });

    });

    it("mounts", () => {

        // Assert
        expect(component.isVueInstance).toBeTruthy();
    });
});
