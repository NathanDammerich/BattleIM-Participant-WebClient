export default (modals = [], action) => {
  switch (action.type) {
    case "ADD_MODAL":
      return [...modals, action.payload];
    case "REMOVE_MODAL":
      return modals.slice(0, -1);
    default:
      return modals;
  }
};
