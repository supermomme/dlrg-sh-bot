module.exports = function () {
  const app = this;

  app.telegraf.command('benachrichtigung', (ctx) => {
    return app.service('users').patch(ctx.state.authedUser._id, {nothification:!ctx.state.authedUser.nothification})
    .then(user=>ctx.reply(`Deine Benachrichtigung wurden ${ctx.state.authedUser.nothification ? 'eingeschaltet' : 'ausgeschaltet'}`))
  })
}
