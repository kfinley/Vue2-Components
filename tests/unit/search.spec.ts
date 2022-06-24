import { search } from '@/search';


describe("Search", () => {

  describe("Lists of Strings", () => {
    // arrange
    const items = [
      "Item 1",
      "Item 2,",
      "Item 3"
    ];

    it('should return 1 result', () => {


      // act
      var result = search(items, "Item 1");

      // assert
      expect(result.length).toBe(1);
    });

    it('should return 3 results', () => {

      // act
      var result = search(items, "Item");

      // assert
      expect(result.length).toBe(3);
    });
  });

  describe("Lists of Objects", () => {

    // arrange
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

    it('should return 1 result', () => {

      // act
      var result = search(items, "Item 1");

      // assert
      expect(result.length).toBe(1);
    });

    it('should return 2 results', () => {

      // act
      var result = search(items, "steve@foo.com");

      // assert
      expect(result.length).toBe(2);
    });

    it('should return 3 results', () => {

      // act
      var result = search(items, "Hope");

      // assert
      expect(result.length).toBe(3);
    });

  });

});
