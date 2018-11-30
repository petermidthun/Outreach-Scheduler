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




class FeedbackPage extends Component {
render() {
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

                            return (
                                <TableRow key={row.instance_id}>

                                    <TableCell title={row.booking_note}>{row.name}</TableCell>
                                    <TableCell >{row.date.substring(0, 10)}</TableCell>
                                    <TableCell>{row.time}</TableCell>


                                </TableRow>
                            )
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
}  //  End component FeedbackPage

const mapReduxStateToProps = (reduxState) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect(mapReduxStateToProps)(withStyles(styles)(FeedbackPage));

