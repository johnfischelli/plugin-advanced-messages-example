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

    console.log(message);

    if (null === message.source.media) {
      this.setState({
        render: (<div dangerouslySetInnerHTML={{ __html: message.source.body }} />)
      })
      return;
    }

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

