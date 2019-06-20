import React from 'react';
import { withTheme } from '@twilio/flex-ui';

class MessageListItem extends React.Component {
  constructor(props) {
    super(props)
    this.props = props;
    this.state = {
      render: null
    }
  }

  componentDidMount() {

    const { message } = this.props;

    // check if the message is not a media message
    if (null === message.source.media) {
      this.setState({
        render: (<div dangerouslySetInnerHTML={{ __html: message.source.body }} />)
      })
      return;
    }

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

export default withTheme(MessageListItem);

