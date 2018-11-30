
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './FeedbackPage.css'

//  Todos commented on far left
//  ToDo:  CRITICAL fields are emptied on refresh, but still update
//  to overwrite originals.  This is BAD!!



const styles = theme => ({  //  Material-ui stuff
    textField: {
        marginLeft: 5,
        marginRight: 5,
      },

});

class FeedbackPage extends Component {
    state = {
        //  Set initial state to be for the booking note and call out information
        //  associated with this program_instance's (from userpage/homepage/calendarpage) 
        //  client and booking as specified in reduxState
        booking_note: this.props.reduxState.bookingNoteReducer.booking_note,
        call_out_information: this.props.reduxState.bookingNoteReducer.booking_note,

        // MAKES LITTLE SENSE TO STORE INPUT FIELDS HERE FORE
        // ITERATIONS OF PROGRAMS/VANS AS EACH ITERATION WOULD
        // NEED IT'S OWN STATE AND SHOULD BE A COMPONENT...
        // WAIT, WILL setSTATE CREATE A NEW ONE PER ID IF
        // WE INCLUDE ID IN EVENT.TARGET.NAME?  YES

    }

    componentDidMount() {
        this.getVanIssuesForThisBooking();
        console.log("get van issues is complete in componentdidmount")
        this.getProgramFeedbackForThisBooking();
        console.log("get program feedback is complete in componentdidmount")
    }  //  End componentDidMount
    
    getVanIssuesForThisBooking = () => { 
    //  When we enter the feedback page, booking_id comes as part of 
    //  the bookingnotereducer that is updated to reflect what client/booking
    //  the feedback is associated with so we can use it to grab the booking_id
    console.log("entered getVanIssuesForBooking")
    let booking_id=this.props.reduxState.bookingNoteReducer.booking_id;
    console.log("grabbing booking id from redux state: ", booking_id);
    this.props.dispatch({ type: 'FETCH_VANS_ISSUES', booking_id: booking_id });
    }

    getProgramFeedbackForThisBooking = () => { 
        console.log("entered getProgramFeedbackForThisBooking")
        let booking_id=this.props.reduxState.bookingNoteReducer.booking_id;
        console.log("grabbing booking id from redux state: ", booking_id);
        this.props.dispatch({ type: 'FETCH_PROGRAM_FEEDBACK', booking_id: booking_id });
    }


    //  ****  TRYING TO DEAL WITH NOTE AND INFO FIELDS EMPTYING ON REFRESH  ****
    // componentDidMount(set reducers, then push navurl onto that navigation thing) 
    //     DISPATCH A FETCH HERE?
    //     console.log("didmount Feedback page");
    //     console.log(this.props.reduxState.bookingNoteReducer);
    //     if (this.props.reduxState.bookingNoteReducer=={}){
    //         this.props.dispatch({ type: 'FETCH_BOOKING_NOTE', id: this.state.booking_id });
    //         this.props.dispatch({ type: 'FETCH_CALL_OUT_INFORMATION', id: this.state.client_id });
    //     }
    // }

//      updateState = () => {
//          console.log("entering updateState() in feedback page");
//          console.log("local state: ", this.state);
//          let booking_note = this.props.reduxState.bookingNoteReducer.booking_note;
//          let call_out_information = this.props.reduxState.calloutInformationReducer.call_out_information;
//          console.log("booking_note: ", booking_note);
//          console.log("call_out_information: ", call_out_information);
//          this.setState({
//             booking_note: booking_note,
//             call_out_information: call_out_information,
//          });
//          console.log("local state: ", this.state);
//         //  this.state.booking_note = this.props.reduxState.bookingNoteReducer.booking_note;
//         //  this.state.call_out_information = this.props.reduxState.calloutInformationReducer.call_out_information;
// }

    handleNameChange = event => {  //  text fields held in state to be submitted to reducer later
        console.log('begin handleNameChange');
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log("handleNameChange complete, state: ", this.state);
    }

    noteUpdateReducer = event => {
        console.log("entering noteUpdateReducer feedbackpage");
        event.preventDefault();
        let object = {
            booking_note: this.state.booking_note,
            booking_id: this.props.reduxState.bookingNoteReducer.booking_id, };
        this.props.dispatch({ type: 'UPDATE_BOOKING_NOTE', payload: object })
    }

    informationUpdateReducer = event => {
        console.log("entering informationUpdateReducer feedbackpage")
        event.preventDefault();
        let object = {
            call_out_information: this.state.call_out_information,
            client_id: this.props.reduxState.calloutInformationReducer.client_id,
        };
        this.props.dispatch({ type: 'UPDATE_CALLOUT_INFORMATION', payload: object})
    }

    addVanIssue = (van_id, stateParameterToReset) => {
        //  Adds a van issue to the database for currently
        //  logged in instructor 
        
        console.log("running van issue update reducer");
        console.log("van_id: ", van_id);
        let statePropertyForVan = "this.state.issueForVan"+van_id;
        let object = {  //  object to sent to post request
            van_id:  van_id,
            issue: eval(statePropertyForVan),
//TODO use momentjs to get time issue was added this date is a dummy date
            date: "2000-01-01",
            instructor_id: this.props.reduxState.user.id,  //  instructor_id not in state, but it's matching user.id is  
            booking_id: this.props.reduxState.bookingNoteReducer.booking_id, //  needed for FETCH_VAN_ISSUES put() in instructorAddVanIssue() of feedback SAGA after server is updated
        }
        
        console.log("STATESTATESTATESTATE: ", this.state);
        console.log("stateParametersToReset passed in: ", stateParameterToReset)
        //let stateParameterToReset2 = JSON.parse(stateParameterToReset)
//  Might need to spread this to retain state
        this.setState({
            stateParameterToReset: "",
        });
        console.log("STATESTATESTATESTATE: ", this.state);
        this.props.dispatch({ type: 'INSTRUCTOR_ADD_VAN_ISSUE', payload: object})
        
    }
 
    addProgramFeedback = (program_id) => {
        console.log("entering addProgramFeedback in FeedbackPage");
       //  Adds program feedback item to the database for currently
        //  logged in instructor 

        console.log("program_id: ", program_id);
        let statePropertyForProgram = "this.state.feedbackForProgram"+program_id;
        console.log("statePropertyForProgram: ", statePropertyForProgram);
        console.log("eval(statePropertyForProgram): ", eval(statePropertyForProgram));
        let object = {  //  object to sent to post request
            program_id:  program_id,
            feedback: eval(statePropertyForProgram),
            instructor_id: this.props.reduxState.user.id,  //  instructor_id not in state, but it's matching user.id is  
            booking_id: this.props.reduxState.bookingNoteReducer.booking_id, //  needed for FETCH_PROGRAM_FEEDBACK put() in instructorAddProgramFeedback() of feedback SAGA after server is updated
        }
        this.props.dispatch({ type: 'INSTRUCTOR_ADD_PROGRAM_FEEDBACK', payload: object})
    }

    deleteVanIssue = (issue_id) => {
        let object = {
        booking_id: this.props.reduxState.bookingNoteReducer.booking_id, //  needed for FETCH_PROGRAM_FEEDBACK put() in instructorAddProgramFeedback() of feedback SAGA after server is updated
        issue_id: issue_id,
        }
        this.props.dispatch({ type: 'INSTRUCTOR_DELETE_VAN_ISSUE', payload: object})
    }

    deleteProgramFeedback= (feedback_id) => {
        let object = {
        booking_id: this.props.reduxState.bookingNoteReducer.booking_id, //  needed for FETCH_PROGRAM_FEEDBACK put() in instructorAddProgramFeedback() of feedback SAGA after server is updated
        feedback_id: feedback_id,
        }
        this.props.dispatch({ type: 'INSTRUCTOR_DELETE_PROGRAM_FEEDBACK', payload: object})
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className="bigdiv">
                    <div className="smalldivs">
                        <div>
                            <TextField
                                name="call_out_information"
                                style={{ width: 400 }}
                                id="filled-multiline-static"
                                label="Call out information for this client:"
                                multiline
                                rows="20"
                                defaultValue={this.props.reduxState.calloutInformationReducer.call_out_information}
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div>
                            <button onClick={this.informationUpdateReducer}>UPDATE</button>
                        </div>
                    </div>
                    {/* ***************************************
                    ****  END OF CALLOUT INFO SECTION  ****
                    *************************************** */}
                    <div className="smalldivs">
                        <div>
                            <TextField
                                name="booking_note"
                                style={{ width: 400 }}
                                id="filled-multiline-static"
                                label="Booking information for this booking:"
                                multiline
                                rows="20"
                                defaultValue={this.props.reduxState.bookingNoteReducer.booking_note}
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                                onChange={this.handleNameChange}
                            /></div>
                        <div>
                        <button onClick={this.noteUpdateReducer}>UPDATE</button>
                        </div>
                    </div>
                    {/* ***************************************
                    *****   END OF BOOKING NOTE SECTION   *****
                    *****   BEGIN VAN ISSUES SECTION       ****
                    ******************************************* */}
                    {/* End of bigdiv below */}
                </div >
                
                <div><p></p></div>
                <div className="bigdiv">
                    <div id="vandiv">

                        {this.props.reduxState.vansIssuesReducer.map(vanArray => {

                            return (
                                <  div key={vanArray[0].van_id} className="vandiv">
                                    <Paper className={classes.root}>


                                        <Table style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' }} className={classes.table} >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{vanArray[0].color} Van Issues</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {vanArray.map(vanIssueArray => {
                                                    return (
                                                        <TableRow key={vanIssueArray.issue_id}>
                                                            <TableCell >{vanIssueArray.issue} <button onClick={() => this.deleteVanIssue(vanIssueArray.issue_id)} style={{ float: "right" }} >RESOLVE</button></TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                                
                                            </TableBody>

                                        </Table>


                                    </Paper>
                                    {/* <p style="margin-bottom:3cm;" ></p> */}
                                    <div className="vanIssueInputDiv">

                                        <input name={"issueForVan" + vanArray[0].van_id} className="vanIssueInputField" type="text" onChange={this.handleNameChange}/>
                                        <button onClick={() => this.addVanIssue(vanArray[0].van_id, "issueForVan" + vanArray[0].van_id)} className="vanIssueInputButton">SUBMIT  </button>

                                    </div>
                                    <p></p>
                                    {/* <p style="margin-bottom:6cm;" ></p> */}
                                </div>
                            )
                        })}

                    </div>
                </div>
                {/* ******************************************************
                    *********         END OF VAN ISSUES        ***********
                    *********         BEGIN PROGRAM FEEDBACK   ***********
                    ****************************************************** */}
                <div className="bigdiv">
                    <div id="vandiv">
                        {this.props.reduxState.programFeedbackReducer.map(programFeedbackArray => {
                            return (
                                <div key={programFeedbackArray[0].feedback} className="vandiv">
                                    <Paper className={classes.root}>
                                        <Table style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' }} className={classes.table} >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{programFeedbackArray[0].name} Program Feedback</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {programFeedbackArray.map(programFeedback => {
                                                    return (
                                                        <TableRow key={programFeedback.feedback_id}>
                                                            <TableCell >{programFeedback.feedback} <button onClick={() => this.deleteProgramFeedback(programFeedback.feedback_id)} style={{ float: "right" }} >RESOLVE</button></TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                    <div className="vanIssueInputDiv">
                                    <input 
                                    name={"feedbackForProgram" + programFeedbackArray[0].program_id} 
                                    className="vanIssueInputField" 
                                    type="text" 
                                    onChange={this.handleNameChange}/>
                                    <button 
                                    className="vanIssueInputButton"
                                    onClick={() => this.addProgramFeedback(programFeedbackArray[0].program_id)}
                                    >SUBMIT  </button>
                                    </div>
                                    <p></p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* *********************************
                    ***  END OF PROGRAM FEEDBACK  *** 
                    **********************************/}

                {/* End of return below */}
            </div>
        ) //  end return
    }  //  end render
}  //  End component FeedbackPage

const mapReduxStateToProps = (reduxState) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect(mapReduxStateToProps)(withStyles(styles)(FeedbackPage));
