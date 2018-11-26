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

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
 
  });


class UserPage extends Component {
    state = {
        client_id: 0,
        booking_id: 0,
    }

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

    updateReducers = event => {
        event.preventDefault();
        console.log('running updateReducers in UserPage, bookingid: ', this.state.booking_id, ' clientid: ', this.state.client_id);
        this.props.dispatch({ type: 'FETCH_BOOKING_NOTE', id: this.state.booking_id });
        this.props.dispatch({ type: 'FETCH_CALL_OUT_INFORMATION', id: this.state.client_id });
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
                                <TableCell>See note</TableCell>
                                <TableCell>Feedback</TableCell>
                               


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxState.instructorCalendarReducer.map(row => {
                                this.state.client_id=row.client_id;
                                this.state.booking_id=row.booking_id;


                                let recentlyVisited2 = [];
                                let recentlyVisited = this.props.reduxState.clientHistoryReducer;
                                recentlyVisited = recentlyVisited.filter(function (item) {
                                    return item.client_id === row.client_id;
                                });
                                for (let instructorVisitObject of recentlyVisited) {
                                    let date = instructorVisitObject.date.substring(0, 4);
                                    let namedate = instructorVisitObject.instructor_name + " in " + date;
                                    recentlyVisited2.unshift(namedate);
                                    if(recentlyVisited2[0]===recentlyVisited2[1]){recentlyVisited2.shift(namedate)};
                                }
                                console.log({ recentlyVisited2 })





                                   
                                
                                    return (
                                    <TableRow  key={row.instance_id}>
                                        <TableCell title={recentlyVisited2} component="th" scope="row">
                                            {row.client}
                                        </TableCell>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell >{row.date.substring(0, 10)}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell>{row.van}</TableCell>
                                        <TableCell><Checkbox checked={row.tourorovernight}  /></TableCell>
                                        <TableCell><Checkbox checked={row.callout}  />
                                        <a href="http://localhost:3000/#/callout" onMouseDown={this.updateReducers}>
                                        Complete
                                        </a>
                                        </TableCell>
                                        <TableCell><Checkbox checked={row.thankyou}  /></TableCell>
                                        <TableCell><Tooltip title={row.booking_note}><Checkbox /></Tooltip></TableCell>
                                        <TableCell><Checkbox disabled />
                                        
                                        <a href="http://localhost:3000/#/feedback" onMouseDown={this.updateReducers}>
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


    

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
//export default connect( mapReduxStateToProps )( UserPage );
export default connect(mapReduxStateToProps)(withStyles(styles)(UserPage));









// // this could also be written with destructuring parameters as:
// // const UserPage = ({ user }) => (
// // and then instead of `props.user.username` you could use `user.username`

// console.log("userpage")

// const UserPage = (props) => (
//   <div>
//     <h1 id="welcome">
//       Welcome, { props.user.username }!
//     </h1>
//     <p>Your ID is: {props.user.id}</p>
//     <p>Your are a(n): {props.user.type}</p>
//     <LogOutButton className="log-in" />
//   </div>
// );

// // Instead of taking everything from state, we just want the user info.
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({user}) => ({ user });
// const mapStateToProps = state => ({
//   user: state.user,
// });

// // this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(UserPage);
