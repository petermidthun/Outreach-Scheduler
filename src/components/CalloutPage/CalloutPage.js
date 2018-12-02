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
import './CalloutPage.css'

//  Todos commented on far left
//  ToDo:  CRITICAL fields are emptied on refresh, but still update
//  to overwrite originals.  This is BAD!!



const styles = theme => ({  //  Material-ui stuff
    textField: {
        marginLeft: 5,
        marginRight: 5,
    },

});

//  Holds an array of instructor visit objects that
//  has been filtred for duplicates and eliminates
//  more recent visits of the same instructor 
let recentlyVisitedFiltered = [];


class CalloutPage extends Component {

    state = {
        //  Set initial state to be for the booking note and call out information
        //  associated with this program_instance's (from userpage/homepage/calendarpage) 
        //  client and booking as specified in reduxState
        booking_note: this.props.reduxState.bookingNoteReducer.booking_note,
        call_out_information: this.props.reduxState.bookingNoteReducer.booking_note,

    }

    componentDidMount(){
       
    }

    filterRecentlyVisited = () => {
        console.log("Entering filterRecentlyVisited in Callout Page")
        //  This code messily takes the array of all instances of when an instructor
        //  visited the client for this program instance, then filters duplicates
        //  and less recent visits for the same instructor 
        recentlyVisitedFiltered = [];
        let recentlyVisitedAll = this.props.reduxState.clientHistoryReducer;
        let client_id = this.props.reduxState.calloutInformationReducer.client_id;
        recentlyVisitedAll = recentlyVisitedAll.filter(function (item) {
            return item.client_id === client_id;
        });
        for (let instructorVisitObject of recentlyVisitedAll) {
            let date = instructorVisitObject.date.substring(0, 4);
            let namedate = instructorVisitObject.instructor_name + " in " + date;
            recentlyVisitedFiltered.unshift(namedate);
            if (recentlyVisitedFiltered[0] === recentlyVisitedFiltered[1]) { recentlyVisitedFiltered.shift(namedate) };
        }

    }   

    handleNameChange = event => {  //  text fields held in state to be submitted to reducer later
        console.log('begin handleNameChange');
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log("handleNameChange complete, state: ", this.state);
    }

    informationUpdateReducer = event => {
        console.log("entering informationUpdateReducer feedbackpage")
        event.preventDefault();
        let object = {
            call_out_information: this.state.call_out_information,
            client_id: this.props.reduxState.calloutInformationReducer.client_id,
        };
        this.props.dispatch({ type: 'UPDATE_CALLOUT_INFORMATION', payload: object })
    }

    

render() {
    this.filterRecentlyVisited();
    const { classes } = this.props;
    return (
 
        <div>

            <div>
        <TextField
        disabled
        defaultValue="Shelley"
          id="filled-textarea"
          label="Contact Name"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <TextField
        disabled
        defaultValue="651 555 4321"
          id="filled-textarea"
          label="Number"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <TextField
        disabled
        defaultValue="Volunteer"
          id="filled-textarea"
          label="Role"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <TextField
        disabled
        defaultValue="Kittson County"
          id="filled-textarea"
          label="Client"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <TextField
        disabled
        defaultValue="Shelley@AOL.com"
          id="filled-textarea"
          label="Contact E-mail"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <TextField
        disabled
        title =  {recentlyVisitedFiltered}
        defaultValue="test"
          id="filled-textarea"
          label="Recently visited instructor"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
            </div>
            <div>
                <Table className={classes.table} >
                    <TableHead>
                        <TableRow>

                            <TableCell >Program</TableCell>
                            <TableCell> Date </TableCell>
                            <TableCell>Time</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.reduxState.instructorCalendarReducer.map(row => {
                            if(this.props.reduxState.bookingNoteReducer.booking_id == row.booking_id) {

                            return (
                                <TableRow key={row.instance_id}>

                                    <TableCell title={row.booking_note}>{row.name}</TableCell>
                                    <TableCell >{row.date.substring(0, 10)}</TableCell>
                                    <TableCell>{row.time}</TableCell>


                                </TableRow>
                            )
                        } //  End if
                        })}


                    </TableBody>
                </Table>
            </div>
            <div>
                <TextField
                    name="call_out_information"
                    style={{ width: 800 }}
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
                <span>
                <button onClick={this.informationUpdateReducer}>UPDATE</button>
                </span>
                {/* <span><FormControlLabel control={<Checkbox value="checkedC" />} label="Call out complete" />
  
 </span> */}
            </div>
        </div>

    ) //  end return
}  //  end render
}  //  End component CalloutPage

const mapReduxStateToProps = (reduxState) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect(mapReduxStateToProps)(withStyles(styles)(CalloutPage));

