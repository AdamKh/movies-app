const tabs = (searchTabChildren, ratedTabChildren) => [
  {
    key: '1',
    label: 'Search',
    children: searchTabChildren,
  },
  {
    key: '2',
    label: 'Rated',
    children: ratedTabChildren,
  },
]
// eslint-disable-next-line import/prefer-default-export
export { tabs }
