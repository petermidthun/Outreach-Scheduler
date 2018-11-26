
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

const styles = theme => ({
    textField: {
        marginLeft: 5,
        marginRight: 5,
      },

});

class FeedbackPage extends Component {
    state = {
        booking_note: "",
        call_out_information: "",
    }

    componentDidMount() {
        this.updateState();
    }

     updateState = () => {
         console.log("entering updateState() in feedback page");
         console.log("local state: ", this.state);
         this.state.booking_note = this.props.reduxState.bookingNoteReducer.booking_note;
         this.state.call_out_information = this.props.reduxState.calloutInformationReducer.call_out_information;
}

    handleNameChange = event => {
        console.log('event happended')
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log("local state: ", this.state);
    }

    noteUpdateReducer = event => {
        console.log("entering noteUpdateReducer feedbackpage");
        event.preventDefault();
        let object = {
            booking_note: this.state.booking_note,
            booking_id: this.props.reduxState.calloutInformationReducer.booking_id, };
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
                    <TextField
                        name="call_out_information"
                        style={{ width: 400 }}
                        id="filled-multiline-static"
                        label="Click 'update information' to save changes"
                        multiline
                        rows="20"
                        defaultValue={this.props.reduxState.calloutInformationReducer.call_out_information}
                        className={classes.textField}
                        margin="normal"
                        variant="filled"
                        onChange={this.handleNameChange}
                    />
                    <input onClick={this.informationUpdateReducer} value='Update information' />
               
                <TextField
                    name="booking_note"
                    style={{ width: 400 }}
                    id="filled-multiline-static"
                    label="Click 'update note' to save changes"
                    multiline
                    rows="20"
                    defaultValue={this.props.reduxState.bookingNoteReducer.booking_note}
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    onChange={this.handleNameChange}
                />
               <input onClick={this.noteUpdateReducer} value='Update note' />
               
            </div >
        ) //  end return
    }  //  end render
}  //  End component FeedbackPage

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect(mapReduxStateToProps)(withStyles(styles)(FeedbackPage));
