import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginLeft: 5,
        marginRight: 5,
      },

});

class CalloutPage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <span>
                <label>Contact Name:</label>
                </span><span>
                <p>Shelley</p>
                </span><span>
                <label>Contact Number:</label>
                </span><span>
                <p> 651 234 5563</p>
                </span><span>
                <label>Contact Role:</label>
                </span><span>
                <p> PTA President </p>
                </span>
                
                <div>
                <label>Client:</label>
                <label>E-mail:</label>
                </div>
                    
            </div >
        ) //  end return
    }  //  end render
}  //  End component FeedbackPage

const mapReduxStateToProps = ( reduxState ) => ({ reduxState });

//  connect index to calendar component so we have access to reduxState props(erties)
export default connect(mapReduxStateToProps)(withStyles(styles)(CalloutPage));