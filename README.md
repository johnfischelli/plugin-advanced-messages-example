# Advanced Messages Example

This plugin provides a starting point to illustrate how to add Markdown support to Twilio chat messages.

Additionally, it adds an input field near the Chat Input field to illustrate how the agent could send an Image (or other file) through the chat channel.

It also replaces the default Message Bubble implementation with a custom version that is able to render markdown or images, if necessary. If sending PDFs this custom message bubble will need to be extended to support rendering a PDF.

Lastly, it contains an example of an first message auto-response when the agent accepts the incoming chat task.

There are serveral comments throughout the code that explain what is happening.

NOTE: styling of the Image input field is left off this example.

![Example Image of Chat UI](https://indigo-bombay-5783.twil.io/assets/advanced-messages-example.png)

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards install the dependencies by running `npm install`:

```bash
cd plugin-mms-messages

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it, in order to deply it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex which would provide them globally.