export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USER':
      let first, rest;
      [first, ...rest] = state;

      return [...state, action.payload];
    default:
      return state;
  }
};
