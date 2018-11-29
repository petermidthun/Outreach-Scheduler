

//  Stores program feedback for all vans associated with a booking
//  Example state:  

const programFeedbackReducer = (state = [], action) => {
    console.log('Entered programFeedbackReducer')
    switch (action.type) {
        case 'SET_PROGRAM_FEEDBACK_REDUCER':
            //  Need to split payload array up by program
            let oldArray = action.payload.data;
            
            //  get highest van_id number
            let highestValue = 0;
            for (let program of oldArray) {
                if (program.program_id > highestValue) {
                    highestValue = program.program_id;
                }
            }
            //  Make a new array of arrays by filtering by 
            //  program_id and pushing the resultant array
            //  to a new array if the resultant array
            //  is not empty.  New array becomes state
            let newArray = [];
            for (let i = 0; i <= highestValue; i++) {
                let resultArray = oldArray.filter(program => program.program_id === i)
                if (resultArray.length !== 0) {
                    newArray.push(resultArray);
                }
            }
            console.log("leaving programFeedbackReducer")
            return newArray;
            
        case 'UNSET_CALLOUT_INFORMATION':
            return [];              //  state is set to empty array
        default:
            return state;
    }
};
  

  export default programFeedbackReducer;