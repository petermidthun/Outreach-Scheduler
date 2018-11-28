//  Stores the calloutinformation string/text for a particular client
//  Example state:  {'blah blah blah'}

const calloutInformationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CALLOUT_INFORMATION':
            console.log("set_callout_information triggered");
            return action.payload;  //  payload is put into state
        case 'UPDATE_CALLOUTINFORMATION_REDUCER':
            console.log("UPDATE_CALLOUTINFORMATION_REDUCER triggered, action.payload: ", action.payload)
            return action.payload;
        case 'UNSET_CALLOUT_INFORMATION':
            return {};              //  state is set to empty array
        default:
            return state;
    }
};
  

  export default calloutInformationReducer;