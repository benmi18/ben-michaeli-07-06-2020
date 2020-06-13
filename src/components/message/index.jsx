import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import './index.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message = ({text, type}) => (<Alert variant="outlined" severity={type}>{text}</Alert>);

export default Message
