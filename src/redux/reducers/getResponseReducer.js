const getResponseReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_RESPONSE_REDUCER' :
      return action.payload;
    default:
      return state;
  }
}

export default getResponseReducer;