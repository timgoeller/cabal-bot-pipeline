var CabalBotExpression = require('./expression')

function pipeline (bot) {
  const pipeline = new Pipeline(bot)
  return pipeline.expression
}

class Pipeline {
  constructor (bot) {
    this.expression = new CabalBotExpression()
    this.bot = bot
    this._registerEvents()
  }

  _registerEvents () {
    this.bot.on('new-command', (envelope, cabalDetails) => {
      this.expression._run(envelope, cabalDetails)
    })
  }
}

module.exports = pipeline
