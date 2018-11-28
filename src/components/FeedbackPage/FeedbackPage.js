
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
    }

    componentDidMount() {
        this.getVanIssuesForThisBooking();
    
    }  //  End componentDidMount
    
    getVanIssuesForThisBooking = () => { 
    //  When we enter the feedback page, booking_id comes as part of 
    //  the bookingnotereducer that is updated to reflect what client/booking
    //  the feedback is associated with so we can use it to grab the booking_id
    let booking_id=this.props.reduxState.bookingNoteReducer.booking_id;
    this.props.dispatch({ type: 'FETCH_VANS_ISSUES', booking_id: booking_id });
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

// Problem here as state should update to hold values on mount
    handleNameChange = event => {  //  text fields held in state to be submitted later
        this.setState({
            [event.target.name]: event.target.value,
        });
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
                                label="Click 'UPDATE' to save changes for this client"
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
                    <div className="smalldivs">
                        <div>
                            <TextField
                                name="booking_note"
                                style={{ width: 400 }}
                                id="filled-multiline-static"
                                label="Click 'UPDATE' to save changes to the booking note"
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
                    {/* End of bigdiv below */}
                </div >
                <div><p></p></div>
                <div className="bigdiv">
                <div id="vandiv">
                
                {this.props.reduxState.vansIssuesReducer.map(vanArray => {
                 
                 return (
                    <div className="bigdiv">
                    <Paper className={classes.root}>
                        

                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell>{vanArray[0].color} Van Issues</TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {vanArray.map(van => {
                                return(
                        <TableRow> 
                                <TableCell >{van.issue} {van.resolved}</TableCell>
                                </TableRow>
                                )})}
                                van_id: 4, color: "Yellow", issue: "gremlin in engine", date_submitted: "2018-04-25T05:00:00.000Z", name: "Ruiz", resolved: false
                        </TableBody>
                    </Table>
                    
                   
                    </Paper>
                    // INSERT BUTTONS HERE
                    <button> Huh </button>
                    <div><div></div>  </div>
                    </div>
                    )})}
                
                </div>
                </div>
                {/* End of return below */}
            </div>
        ) //  end return
    }  //  end render
}  //  End component FeedbackPage

const mapReduxStateToProps = (reduxState) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect(mapReduxStateToProps)(withStyles(styles)(FeedbackPage));
