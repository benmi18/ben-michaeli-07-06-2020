import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import './index.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EmptyMessage = ({text}) => (<Alert severity="info">{text}</Alert>);

export default EmptyMessage
