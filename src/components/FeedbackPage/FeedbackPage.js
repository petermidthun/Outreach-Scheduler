
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
    //  Display projects when page loads
    componentDidMount() {
        this.getCalendar();
    }

    getCalendar = () => {
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div >
        <TextField
          
          style={{ width: 400 }} 
          id="filled-multiline-static"
          label="Update here and click submit button"
          multiline
          rows="20"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          variant="filled"
        
        />
        <button>submit stuff</button>

                <TextField
          
          style={{ width: 400 }} 
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows="20"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
         <button>submit stuff</button>
            </div>
            </div>
        ) //  end return
    }  //  end render
}  //  End component FeedbackPage

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect(mapReduxStateToProps)(withStyles(styles)(FeedbackPage));
