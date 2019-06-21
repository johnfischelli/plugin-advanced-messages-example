import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@twilio/flex-ui';

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.props = props;
    this.state = {};

    this.props.chatChannel.getMembers().then(members => {
      let flexMemberIdentity = this.props.state.flex.chat.session.client.user.identity;
      members.forEach(member => {
        if ("chat" === member.type) {
          if (member.identity === flexMemberIdentity) {
            return;
          }
          member.getUser().then(user => {
            this.setState({
              subscribedUser: user
            })
          })
        }
      })
    })
  }

  componentWillUnMount() {
    // disable listener
  }

  render() {
    console.log(this.state.subscribedUser);
    if (!this.state.subscribedUser) {
      return null;
    }
    if (this.state.subscribedUser.online) {
      return <div>User is Reachable</div>
    }
    if (!this.state.subscribedUser.online) {
      return <div>User is unreachable</div>
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { channels } = state.flex.chat;
  const { sid } = ownProps;
  const chatChannel = channels && channels[sid].source;

  return {
    state,
    chatChannel
  };
}

export default connect(mapStateToProps)(withTheme(FileUpload));

