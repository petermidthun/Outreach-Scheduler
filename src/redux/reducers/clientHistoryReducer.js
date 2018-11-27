//  This reducer stores all instructor visits to all clients
//  Example object from the array:
//  {client_id: 1
//   date: "2017-03-23T05:00:00.000Z"
//   instructor_name: "keesha"}

const clientHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLIENT_HISTORY_DATA':
            console.log("SET_CLIENT_HISTORY_DATA triggered");
            return action.payload;  //  payload is put into state
        case 'UNSET_CLIENT_HISTORY_DATA':
            return [];              //  state is set to empty array
        default:
            return state;
    }
};
  
  export default clientHistoryReducer;
  