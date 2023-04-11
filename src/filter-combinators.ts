//ht: https://codepen.io/Universalist/post/predicates-in-javascript
export const and = (p1, p2) => {
  return function (x) {
    // console.log('and', p1(x) && p2(x));
    return p1(x) && p2(x);
  };
};

export const not = (p) => {
  return function (x) {
    // console.log('not', !p(x));
    return !p(x);
  };
};

export const equals = (prop, value) => {
  return function (x: any) {
    // console.log('equals', x[prop] === value);

    // console.log('prop', prop);
    // console.log(value);
    // console.log(x[prop]);

    if (prop.indexOf(".") > -1) {
      const props = prop.split(".");
      return x[props[0]][props[1]] == value;
    } else {
      return x[prop] == value;
    }
  };
};

export const less = (x) => {
  return function (y) {
    return y < x;
  };
};

export const greater = (x) => {
  return function (y) {
    return y > x;
  };
};

export const createEqualsPredicate = function createEqualsPredicate<T>(
  props: Record<string, any>
) {
  const equalsConditions: ((value: T, index: number, obj: T[]) => unknown)[] =
    [];

  for (const p in props) {
    equalsConditions.push(equals(p, props[p]));
  }

  let condition: (value: T, index: number, obj: T[]) => unknown =
    equalsConditions[0];

  equalsConditions.forEach((e) => {
    if (e !== condition) {
      condition = and(condition, e);
    }
  });

  return condition;
};
