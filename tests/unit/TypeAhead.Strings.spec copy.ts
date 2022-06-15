import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";
import { states } from '@/data';

//TODO: move to helper..
//Setup validation
import { setupValidation } from '@/components/validation';
import { extend } from 'vee-validate';
setupValidation(extend);

describe("type-ahead.vue using strings as items", () => {

  let component: Wrapper<Vue, Element>;
  let model: Record<string, any> = {
    name: '',
    email: '',
    state: ''
  };

  beforeEach(() => {
    // Arrange
    component = Factory.create(Components.TypeAhead,
      {
        value: model,
        rules: 'required',
        placeholder: 'Type a state...',
        name: "state",
        queryPropertyName: "state", //TODO: rename prop...
        items: Object.values(states),
        onSelect: (item: any) => {
          // console.log(item);
          model.name = item;
        }
      }
    );

    jest.useFakeTimers();
  });

  it("mounts", () => {

    // Assert
    expect(component.isVueInstance).toBeTruthy();
  });

  it("Fires focus on mount", () => {

    // Arrange

    const setValuePromise = component.find('input');

    // Act (the act is mounting in this case)
    // Assert
    expect(component.emitted('focus')?.length == 1).toBeTruthy();

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
      });
  });

  it("Should show a list of results after at least 3 characters are input", () => {

    // Arrange

    const setPromise = component.find('input').setValue('New') as Promise<void>;

    setPromise
      .then(() => jest.runAllTimers()) // Act - Wait for time to pass...
      .then(() => { // Assert

        const typeAheadContainer = component.find('.typeahead-dropdown-container');
        const resultsList = typeAheadContainer.find('ul'); // First ul in the container is the result list. Second ul is the No Results ul.

        expect(resultsList).toBeTruthy();
        expect(resultsList.findAll('li').length).toBe(4); // Should contain the 4 states with 'New' in the name
      });

  });

  it("Should set the value to the selected item in the results list", () => {

    // Arrange

    const input = component.find('input');
    const setPromise = input.setValue('New') as Promise<void>;
    const inputElement = input.element as HTMLInputElement;

    setPromise
      .then(() => jest.runAllTimers())
      .then(() => {
        const firstResult = component.find('div.typeahead-dropdown-container > ul > li');

        // Act
        const clickResultPromise = firstResult.trigger('click') as Promise<void>;

        clickResultPromise
          .then(() => jest.runAllTimers())
          .then(() => {

            // Assert
            expect(component.find('div.typeahead-dropdown-container').element).toBeFalsy();
            expect(inputElement.value).toBe('New Hampshire');
          });
      });
  });

});
