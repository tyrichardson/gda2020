const getFavoritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_WRITER_FAVORITES' :
      return action.payload;
    default:
      return state;
  }
}

export default getFavoritesReducer;