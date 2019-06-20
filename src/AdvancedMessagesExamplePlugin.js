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
    flex.MessagingCanvas.Content.add(<FileUpload key="file-upload" />);
    flex.MessageListItem.Content.replace(<MessageListItem key="new-message-bubble" />);

    flex.Actions.addListener('beforeSendMessage', (payload) => {
      payload.body = marked(payload.body);
    })
  }
}
