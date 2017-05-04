module.exports = function () {
  const app = this;
  app.telegraf.use((ctx,next)=>{
    if (!ctx.state.isResolvedMessage) {
      ctx.reply(`Es gibt folgende Befehle:\n/benachrichtigung - schaltet die Jira Benachrichtigung ein und aus.\n/status - verändert den Aktuellen status.`)
    }
  })
}
