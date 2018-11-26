
const calloutInformationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CALLOUT_INFORMATION':
            console.log("set_callout_information triggered");
            return action.payload[0];  //  payload is put into state
        case 'UPDATE_CALLOUTINFORMATION_REDUCER':
            console.log("UPDATE_CALLOUTINFORMATION_REDUCER triggered, action.payload: ", action.payload)
            return action.payload;
        case 'UNSET_CALLOUT_INFORMATION':
            return {};              //  state is set to empty array
        default:
            return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
  export default calloutInformationReducer;