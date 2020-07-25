const getWriterStoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_WRITER_STORIES' :
      return action.payload;
    default:
      return state;
  }
}

export default getWriterStoriesReducer;