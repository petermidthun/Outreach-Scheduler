import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import React, { Component } from 'react';


class UserPage extends Component {
    //  Display projects when page loads
    componentDidMount() {
        this.getCalendar();
    }

    getCalendar = () => {   //  Get list of programming and send to reduxState
      console.log("running getCalendar in UserPage")
      this.props.dispatch({ type: 'FETCH_CALENDAR' });
    }



    render() {
        return (
            <div>
                <p> Calendar </p>
                
                <pre>{JSON.stringify(this.props.reduxState)}</pre>

            </div>
        )//  End return

    } //  End render

}  //  End component 

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect( mapReduxStateToProps )( UserPage );









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
