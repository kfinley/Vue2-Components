import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";
import { states } from '@/data';

describe("type-ahead.vue", () => {

  let component: Wrapper<Vue, Element>;

  beforeEach(() => {
    // Arrange
    component = Factory.create(Components.TypeAhead, undefined, {
      items: Object.values(states)
    });

    jest.useFakeTimers();
  });

  it("mounts", () => {

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  });

  it("Fires update on 3 characters input", () => {

    // Arrange
    const setPromise = component.find('input').setValue('New') as Promise<void>;

    setPromise
      .then(() => jest.runAllTimers()) // Act - Wait for time to pass...
      .then(() => { // Assert
        const updateEvent = component.emitted('update');

        if (updateEvent) {
          expect(updateEvent).toHaveLength(1);
          expect(updateEvent[0]).toEqual(['New'])
        } else {
          fail('update did not fire');
        }
      });
  });

  it("Does not fire update on less than 3 characters input", () => {

    // Arrange
    const setPromise = component.find('input').setValue('No') as Promise<void>;

    setPromise
      .then(() => jest.runAllTimers()) // Act - Wait for time to pass...
      .then(() => { // Assert
        const updateEvent = component.emitted('update');
        expect(updateEvent).toBe(undefined);
      })
  });

})
