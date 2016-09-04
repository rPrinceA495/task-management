import _ from 'lodash';

export default function toContainAnyOf() {
  return {
    compare(actual, expected) {
      return {
        pass: !_.isEmpty(_.intersection(actual, expected)),
      };
    },
  };
}
