const initialState = {
  selectedProducts: [],
  selectedCustomer: "Hello",
  totalPrice: {}
};

const reducer = (state = initialState, action) => {
  if(action.type === 'UPDATE') {
    return {
      ...state,
      selectedProducts: [...action.value]
    }
  }

  if(action.type === 'UPDATE_PRICE_MODEL') {
    return {
      ...state,
      selectedProducts: [...action.value]
    }
  }

  if(action.type === 'UPDATE_TOTAL_PRICE') {
    return {
      ...state,
      totalPrice: [...action.value]
    }
  }
  return state;
};

export default reducer;