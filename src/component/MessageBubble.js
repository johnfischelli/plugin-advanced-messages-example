import React from 'react';
import { withTheme } from '@twilio/flex-ui';

class MessageBubble extends React.Component {
  constructor(props) {
    super(props)
    this.props = props;
    this.state = {
      render: null
    }
  }

  componentDidMount() {

    const { message } = this.props;

    console.log(message);
    const {mimeType, medialurl } = message.attributes;

    switch(mimeType) {
      case 'application/PDF':
        this.setState({
          render: (<a href={mediaUrl}><img width="200" src="SOME PDF ICON" alt="alt" /></a>)
        })  
      break;
      default:
        this.setState({
          render: (<img width="200" src={medialUrl} alt="alt" />)
        })  
    }
  }

  render() {
    return this.state.render;
  }
}

export default withTheme(MessageBubble);

