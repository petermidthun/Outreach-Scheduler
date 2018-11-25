
const clientHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLIENT_HISTORY_DATA':
            console.log("set_CLIENT_HISTORY_data triggered");
            console.log("payload: ", action.payload);
            return action.payload;  //  payload is put into state
        case 'UNSET_CLIENT_HISTORY_DATA':
            return [];              //  state is set to empty array
        default:
            return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
  export default clientHistoryReducer;
  