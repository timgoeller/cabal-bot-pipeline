cabal-bot-pipeline

`npm install cabal-bot-pipeline`

```javascript
var CabalBot = require('cabal-bot-core')
var pipeline = require('cabal-bot-pipeline')

const cb = new CabalBot('example-bot', { channels: ['default','weather'] })

// react to !log ping
pipeline(cb).onCommand('log').onCommand('ping').do(
  (messageText, cabal, envelope) => {
    console.log('ping!')
  }
)

// react to !log pong
pipeline(cb).onCommand('log').onCommand('pong').do(
  (messageText, cabal, envelope) => {
    console.log('pong!')
  }
)

// return whatever the user enters after !return
pipeline(cb).onCommand('return').do(
  (messageText, cabal, envelope) => {
    cabal.publishMessage({
      type: 'chat/text',
      content: {
        text: messageText,
        channel: envelope.channel
      }
    })
  }
)

//r eact to !weatherreport in a channel named weather
pipeline(cb).onCommand('weatherreport').inChannel('weather').do(
  (messageText, cabal, envelope) => {
    cabal.publishMessage({
      type: 'chat/text',
      content: {
        text: 'the weather is nice and clear',
        channel: envelope.channel
      }
    })
  }
)
cb.joinCabal('{key}')
```