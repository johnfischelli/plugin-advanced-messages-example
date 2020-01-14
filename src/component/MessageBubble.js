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

    // message.source.media.contentType will contain the messages content type
    // by switching on this value you should be able to render the message however you want
    // for example, PDFs

    // if the message is a media message - retrieve its url and render it inside an image
    message.source.media.getContentUrl().then((url) => {
      this.setState({
        render: (<img width="200" src={url} alt="alt" />)
      })
    })
  }

  render() {
    return this.state.render;
  }
}

export default withTheme(MessageBubble);

