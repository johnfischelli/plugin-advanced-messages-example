import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import FileUpload from './component/FileUpload';
import MessageBubble from './component/MessageBubble';
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
      Replace MessageBubble with a custom implementation
    **/
    flex.MessageBubble.Content.replace(<MessageBubble key="new-message-bubble" />);

    /**
      Example of how to pre-process the message body before sending the message into the chat channel
      This utilizes the Marked library -- https://marked.js.org which supports CommonMark 0.29
    **/
    flex.Actions.addListener('beforeSendMessage', (payload) => {
      payload.body = marked(payload.body);
    })

    /**
      Example of Agent auto-response
    **/
    flex.Actions.addListener("afterAcceptTask", (payload) => {

      // store the channel we're seeking to work with
      let channelSid = payload.task.attributes.channelSid;

      // if the task is not a web chat - end
      if (!flex.TaskHelper.isChatBasedTask(payload.task)) {
        return;
      }

      // Once the task is accepted, it takes time to boot the Chat SDK
      // Polling and checking for the channel is a way to ensure the
      // the channel is ready to go before attempting to send in our first message
      let channelPromise = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          let channel = manager.store.getState().flex.chat.channels[channelSid];
          if (undefined !== channel && undefined !== channel.source) {
            clearInterval(interval);
            resolve(channel.source);
          }
        }, 250)
      });

      // we now have access to the task attributes through payload.task.attributes
      // we have worker details through manager.workerClient.attributes
      // using these pieces of information you could call-out to a service
      // to determine what the welcome message should be

      // when the channel is finally ready
      channelPromise.then((channel) => {
        // set the body and send a message in the channel
        let body = `Hi! I'm ${manager.workerClient.attributes.full_name} and this is our predefined message.`;
        flex.Actions.invokeAction('SendMessage', {
          channelSid: channel.sid,
          body: body
        });
      })
    })
  }
}
