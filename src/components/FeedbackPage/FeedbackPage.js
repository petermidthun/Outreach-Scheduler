
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
        // WE INCLUDE ID IN EVENT.TARGET.NAME?

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
    // componentDidMount() {
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
    addVanIssue = (van_id) => {
        //  Adds a van issue to the database for currently
        //  logged in instructor 
//TODO use momentjs to get time issue was added
        console.log("running van issue update reducer");
        console.log("van_id: ", van_id);
        let statePropertyForVan = "this.state.issueForVan"+van_id;
        console.log("statePropertyForVan: ", statePropertyForVan);
        console.log("eval(statePropertyForVan): ", eval(statePropertyForVan));
        let object = {  //  object to sent to post request
            van_id:  van_id,
            issue: eval(statePropertyForVan),
            date: "2000-01-01",
            instructor_id: 1,  //  Need to get from instructorCalendarReducer
            booking_id: this.props.reduxState.bookingNoteReducer.booking_id,
        }
        this.props.dispatch({ type: 'INSTRUCTOR_ADD_VAN_ISSUE', payload: object})
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
                    {/* *******************************************
                    *****   END OF BOOKING NOTE SECTION   *****
                    ******************************************* */}
                    {/* End of bigdiv below */}
                </div >
                
                <div><p></p></div>
                <div className="bigdiv">
                    <div id="vandiv">

                        {this.props.reduxState.vansIssuesReducer.map(vanArray => {

                            return (
                                <div className="vandiv">
                                    <Paper className={classes.root}>


                                        <Table style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' }} className={classes.table} >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{vanArray[0].color} Van Issues</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {vanArray.map(van => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell >{van.issue} <button style={{ float: "right" }} >RESOLVE</button></TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                                {/* van_id: 4, color: "Yellow", issue: "gremlin in engine", date_submitted: "2018-04-25T05:00:00.000Z", name: "Ruiz", resolved: false */}
                                                {/* <input>Input field</input> */}
                                                {/* <input type="text" name="company" form="my_form" />
                                <button onClick={this.noteUpdateReducer}>SUBMIT NEW ISSUE</button>
                                 */}
                                            </TableBody>

                                        </Table>


                                    </Paper>
                                    {/* <p style="margin-bottom:3cm;" ></p> */}
                                    <div className="vanIssueInputDiv">

                                        <input name={"issueForVan" + vanArray[0].van_id} className="vanIssueInputField" type="text" onChange={this.handleNameChange}/>
                                        <button onClick={() => this.addVanIssue(vanArray[0].van_id)} className="vanIssueInputButton">SUBMIT  </button>

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
                    ****************************************************** */}
                <div className="bigdiv">
                    <div id="vandiv">
                        {this.props.reduxState.programFeedbackReducer.map(programArray => {
                            return (
                                <div className="vandiv">
                                    <Paper className={classes.root}>
                                        <Table style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' }} className={classes.table} >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{programArray[0].name} Program Feedback</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {programArray.map(program => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell >{program.feedback} <button style={{ float: "right" }} >RESOLVE</button></TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                    <div className="vanIssueInputDiv">
                                        <input className="vanIssueInputField" type="text" />
                                        <button className="vanIssueInputButton">SUBMIT  </button>
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
