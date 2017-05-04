module.exports = function () {
  const app = this;

  app.telegraf.command('status', (ctx) => {
    return app.service('status').find()
    .then(res=>res.data)
    .then(status=>{
      let inline_keyboard = status.reduce((prev,cur)=>{
        prev.push([{text:cur.title, callback_data:`status_${cur._id}`}])
        return prev;
      },[])
      ctx.replyWithMarkdown("Wähle dein Neuen Status", {
        reply_markup: JSON.stringify({
          inline_keyboard: inline_keyboard
        })
      })
    })

  })

  app.telegraf.on('callback_query', (ctx) => {
    let info = ctx.callbackQuery.data.split('_')
    if (info[0]) {
      return app.service('status').get(info[1])
      .then(res=>{
        return app.service('users').patch(ctx.state.authedUser._id, {status:res._id})
        .then(user=>ctx.answerCallbackQuery(`Okay, du hast dein status zu ${user.status.title} gesetzt`))
      })
      .catch(err=>console.error(err))
    }
  })
}
