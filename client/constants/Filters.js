import Statuses from './Statuses';

const Filters = {
  ...Statuses,
  Templates: 'templates',
};

Filters.All = [
  ...Statuses.All,
  Filters.Templates,
];

export default Filters;
