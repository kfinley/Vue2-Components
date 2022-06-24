import Components from "@/components";
import { Wrapper } from "@vue/test-utils";
import { Factory } from "../utils";
import { states } from '@/data';

//TODO: move to helper..
//Setup validation
import { setupValidation } from '@/components/validation';
import { extend } from 'vee-validate';
setupValidation(extend);

let objects = [
  {
    id: '09f8905a-1de9-4bc3-9326-f419c4d3f2d3',
    state: 'New Hampshire'
  },
  {
    id: '48487227-5105-4a8e-a36e-a4223266bd58',
    state: 'New York'
  }
];

//TODO: move to a data.ts
const items = [
  {
    id: '139f18a7-735c-4e24-a229-1d1bd8b45a28',
    name: 'Item 1',
    contact: 'steve@foo.com',
    address: {
      id: 'E71D1381-0558-4ED9-A348-0C465C17E928',
      street: '123 Main St',
      city: 'Hope',
      state: 'AR',
      postalCode: '71801'
    }
  },
  {
    id: '1e684a5c-9ac7-4e92-b9eb-a6d364bb7a98',
    name: 'Item 2',
    contact: 'steve@foo.com',
    address: {
      id: '87D55D29-12E8-4992-9BA3-048BB0CF6736',
      street: '345 Elm St',
      city: 'Hope',
      state: 'AR',
      postalCode: '71801'
    }
  },
  {
    id: '8E6A58A8-BD0F-48DA-9BE3-6B3D67DC8614',
    name: 'Item 3',
    address: {
      id: '9DE45F24-B162-495B-BA23-6551CB5BCAD6',
      street: '789 Oak St',
      city: 'Hope',
      state: 'AR',
      postalCode: '71801'
    }
  }
];

describe("type-ahead.vue", () => {

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

  it.each([
    { type: 'strings', values: Object.values(states) },
    { type: 'objects', values: objects }
  ])
    ('Should set the value to the selected item in the results list using string | objects', //TODO: figure out how to get string formatting to work for $type var
      ({ type, values }) => {
        // console.log(type);
        // console.log(values);
        // console.log(items);

        // Arrange
        component = Factory.create(Components.TypeAhead,
          {
            value: model,
            rules: 'required',
            placeholder: 'Type a state...',
            name: "state",
            queryPropertyName: "state", //TODO: rename prop...
            items: values,
            onSelect: (item: any) => {
              // console.log(item);
              model.name = item;
            }
          }
        );

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

  it.each([
    {
      term: 'item', result: 3, items: items
    },
    {
      term: 'steve', result: 2, items: items
    }
  ])("Should show a list of results with search term highlighted in results", ({ term, result, items }) => {

    // Arrange

    component = Factory.create(Components.TypeAhead,
      {
        value: model,
        rules: 'required',
        placeholder: 'Search for a track...',
        name: "search",
        items: items,
        onSelect: (item: any) => {
          // console.log(item);
          model.name = item;
        }
      }
    );

    const setPromise = component.find('input').setValue(term) as Promise<void>;

    setPromise
      .then(() => jest.runAllTimers()) // Act - Wait for time to pass...
      .then(() => {
        // Assert

        const typeAheadContainer = component.find('.typeahead-dropdown-container');

        // First ul in the container is the result list. Second ul is the No Results ul.
        const resultsList = typeAheadContainer.find('ul');
        expect(resultsList).toBeTruthy();

        const links = resultsList.findAll('li > a');
        expect(links.length).toBe(result);

        links.filter(item => {
          //console.log(item.html());
          //expect(item.html().toLocaleLowerCase().includes(`<b>${term}</b>`)).toBeTruthy();
        });

      });

  });

});
