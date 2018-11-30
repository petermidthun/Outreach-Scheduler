//  Stores van issues for all vans associated with a booking
//  Example state:  

const vansIssuesReducer = (state = [], action) => {
    console.log('Entered vansIssuesReducer')
    switch (action.type) {
        case 'SET_VANS_ISSUES_REDUCER':
            //  Need to split payload array up by van
            let oldArray = action.payload.data;
            
            //  get highest van_id number
            let highestValue = 0;
            for (let van of oldArray) {
                if (van.van_id > highestValue) {
                    highestValue = van.van_id;
                }
            }
            //  Make a new array of arrays by filtering by 
            //  van_id and pushing the resultant array
            //  to a new array if the resultant array
            //  is not empty.  New array becomes state
            let newArray = [];
            for (let i = 0; i <= highestValue; i++) {
                let resultArray = oldArray.filter(van => van.van_id === i)
                if (resultArray.length !== 0) {
                    newArray.push(resultArray);
                }
            }
            console.log("leaving vansIssuesReducer")
            return newArray;
            
        case 'UNSET_CALLOUT_INFORMATION':
            return [];              //  state is set to empty array
        default:
            return state;
    }
};
  

  export default vansIssuesReducer;