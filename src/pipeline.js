var CabalBotExpression = require('./expression')

function pipeline (bot, prefixRequired = true) {
  const pipeline = new Pipeline(bot, prefixRequired)
  return pipeline.expression
}

class Pipeline {
  constructor (bot, prefixRequired) {
    this.expression = new CabalBotExpression()
    this.expression.prefixRequired = prefixRequired
    this.bot = bot
    this._registerEvents()
  }

  _registerEvents () {
    this.bot.on('new-command', (envelope, cabalDetails, messageInfo) => {
      if (this.expression.prefixRequired) {
        this.expression._run(envelope, cabalDetails, messageInfo)
      }
    })
    this.bot.on('new-message', (envelope, cabalDetails, messageInfo) => {
      if (!this.expression.prefixRequired) {
        this.expression._run(envelope, cabalDetails, messageInfo)
      }
    })
  }
}

module.exports = pipeline
