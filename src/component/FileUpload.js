import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@twilio/flex-ui';

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.props = props;
    this.state = {
      selectedImage: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const file = Array.from(e.target.files)
    this.setState({
      selectedImage: file[0]
    })
    console.log(file[0]);
  }

  onSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append('file', this.state.selectedImage)

    this.props.chatChannel.sendMessage(data);
  }

  render() {
    return (
      <form className="twilioUploadForm" onSubmit={ this.onSubmit }>
        <input name="media" onChange={ this.onChange } type="file" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { channels } = state.flex.chat;
  const { sid } = ownProps;
  const chatChannel = channels && channels[sid].source;

  return {
    chatChannel
  };
}

export default connect(mapStateToProps)(withTheme(FileUpload));

