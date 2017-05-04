module.exports = function () {
  const app = this;
  app.telegraf.use((ctx,next)=>{
    app.service('users').find({query:{telegramId:ctx.from.id}})
    .then(res=>res.data[0] ? res.data[0] : Promise.reject("Not Authenticated"))
    .then(user=>{
      ctx.state.authedUser = user;
      next();
    })
    .catch(err=>{
      if (err == "Not Authenticated") {
        ctx.reply(`Du bist nicht Authoritiert. Wende dich an @supermomme mit der folgenden ID: ${ctx.from.id}`);
      } else {
        ctx.reply(`Es ist ein Fehler aufgetreten. Wende dich an den AdministraThore @Rathsack`);
        console.log(err);
      }
    })
  })
}
