import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

//  Todos commented on far left
//  Vans should be per date here in updateReducers and also in feedback page,
//  so you get the vans and programs for the date of the program instance you click on in the table

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
 
  });


class UserPage extends Component {


    //  Display projects when page loads
    componentDidMount() {
        this.getCalendar();
    }

    getCalendar = () => {   //  Get list of programming and send to reduxState
      console.log("running getCalendar in UserPage")
      console.log(this.props.reduxState.instructorCalendarReducer);
      let id=this.props.reduxState.user.id;
      this.props.dispatch({ type: 'FETCH_CALENDAR', id: id });
      this.props.dispatch({ type: 'FETCH_CLIENT_HISTORY'});
      
    }

    updateReducers = (client_id, booking_id) => {
        console.log('running updateReducers in UserPage, bookingid: ', booking_id, ' clientid: ', client_id);
        this.props.dispatch({ type: 'FETCH_BOOKING_NOTE', id: booking_id });
        this.props.dispatch({ type: 'FETCH_CALL_OUT_INFORMATION', id: client_id });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TableCell >Client</TableCell>
                                <TableCell >Program</TableCell>
                                <TableCell> Date </TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Van</TableCell>
                                <TableCell>ON?</TableCell>
                                <TableCell>Called out?</TableCell>
                                <TableCell>Thanks sent?</TableCell>

                                <TableCell>Feedback</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxState.instructorCalendarReducer.map(row => {
                                //  +++  THIS DOES NOT WORK SO I HAD TO MUTATE STATE FOR NOW
                                // this.setState({
                                //     client_id: row.client_id,
                                //     booking_id: row.booking_id,
                                // });
                                        // console.log("mapping calendar, row.client.id", row.client.id)
                                        // currentclient_id = row.client_id;
                                        // currentbooking_id = row.booking_id;

//  Todo: put below code in a function
                                //  This code messily takes the array of all instances of when an instructor
                                //  visited the client for this program instance, then filters duplicates
                                //  and less recent visits for the same instructor  
                                let recentlyVisitedFiltered = [];
                                let recentlyVisitedAll = this.props.reduxState.clientHistoryReducer;
                                recentlyVisitedAll = recentlyVisitedAll.filter(function (item) {
                                    return item.client_id === row.client_id;
                                });
                                for (let instructorVisitObject of recentlyVisitedAll) {
                                    let date = instructorVisitObject.date.substring(0, 4);
                                    let namedate = instructorVisitObject.instructor_name + " in " + date;
                                    recentlyVisitedFiltered.unshift(namedate);
                                    if (recentlyVisitedFiltered[0] === recentlyVisitedFiltered[1]) { recentlyVisitedFiltered.shift(namedate) };
                                }
                                console.log({ recentlyVisitedFiltered })
//  End function

                                return (
                                    <TableRow key={row.instance_id}>
                                        <TableCell title={recentlyVisitedFiltered} component="th" scope="row">
                                            {row.client}
                                        </TableCell>
                                        <TableCell title={row.booking_note}>{row.name}</TableCell>
                                        <TableCell >{row.date.substring(0, 10)}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.van}</TableCell>
                                        <TableCell><Checkbox color='default' checked={row.tourorovernight} /></TableCell>
                                        <TableCell><Checkbox color='default' checked={row.callout} />
                                         {/* MouseUp does not work for the ref below as the specified reducers reset when the referenced page loads... */}
{/* ToDo:  Better to do this by loading the component rather than navigating to the page address?*/}
                                            <a href="http://localhost:3000/#/callout" onMouseDown={() => this.updateReducers(row.client_id, row.booking_id)}>
                                                Complete
                                        </a>
                                        </TableCell>
                                        <TableCell><Checkbox color='default' checked={row.thankyou} /></TableCell>
                                        <TableCell><Checkbox disabled />
                                        {/* MouseUp does not work for the ref below as the specified reducers reset when the referenced page loads... */}
{/* ToDo:  Better to do this by loading the component rather than navigating to the page address?*/}   
                                        <a href="http://localhost:3000/#/feedback" onMouseDown={() => this.updateReducers(row.client_id, row.booking_id)}>  
                                                Provide
                                        </a>
                                        </TableCell>

                                    </TableRow>
                                )
                            })}


                        </TableBody>
                    </Table>
                </Paper>
                <p> Calendar </p>
                <h1 id="welcome">
                    Welcome, {this.props.reduxState.user.username}!
     </h1>
                <p>Your ID is: {this.props.reduxState.user.id}</p>
                <p>Your are a(n): {this.props.reduxState.user.type}</p>
                <LogOutButton className="log-in" />
                <pre>{JSON.stringify(this.props.reduxState)}</pre>

            </div>
        )//  End return

    } //  End render

}  //  End component 

//  Make reduxstate where it is available here as reduxState
const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

//  connect reduxstate to userpage component so we have access to reduxState props(erties)
//  also connect styles for material-ui
export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));
