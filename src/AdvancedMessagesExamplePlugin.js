import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import FileUpload from './component/FileUpload';
import MessageListItem from './component/MessageListItem';
import marked from 'marked';

const PLUGIN_NAME = 'AdvancedMessagesExample';

export default class AdvancedMessagesExample extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    /**
      Append a small File Upload Component to the Messaging Canvas
    **/
    flex.MessagingCanvas.Content.add(<FileUpload key="file-upload" />);

    /**
      Replace MessageListItems with a custom implementation
      @TODO: Twilio team to restore default styling
    **/
    flex.MessageListItem.Content.replace(<MessageListItem key="new-message-bubble" />);

    /**
      Example of how to pre-process the message body before sending the message into the chat channel
      This utilizes the Marked library -- https://marked.js.org which supports CommonMark 0.29
    **/
    flex.Actions.addListener('beforeSendMessage', (payload) => {
      payload.body = marked(payload.body);
    })
  }
}
