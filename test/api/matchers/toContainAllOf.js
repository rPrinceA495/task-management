import _ from 'lodash';

export default function toContainAllOf() {
  return {
    compare(actual, expected) {
      return {
        pass: _.isEmpty(_.difference(expected, actual)),
      };
    },
  };
}
