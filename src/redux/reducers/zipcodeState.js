const zipcodeStateReducer = (state = [], action) => {
    switch (action.type) {
        case 'ZIPCODE' :
            return action.payload;
        default:
            return state;
    }
}

export default zipcodeStateReducer;