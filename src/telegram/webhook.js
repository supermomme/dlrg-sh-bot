module.exports = function () {
  const app = this;
  app.use('/webhook/', (req, res, next)=>{
    let body = req.body;
    let jiraUser = body.user;
    let issue = body.issue;
    if (body.changelog && body.changelog.items) {

      let changelogItems = body.changelog.items;
      for (var i = 0; i < changelogItems.length; i++) {
        switch (changelogItems[i].field) {
          case "assignee":
            if (jiraUser.key != issue.fields.assignee.key) {
              app.service('users').find({query:{jiraKey:issue.fields.assignee.key}})
              .then(res=>res.data[0])
              .then(user=>{
                if (user && user.nothification) {
                  let message = `Dir wurde soeben von _${jiraUser.displayName}_ das Ticket '*${issue.fields.summary}*' zugewiesen.\nKey:*${issue.key}*\nLink(BETA): https://support.dlrg.sh/browse/${issue.key}`
                  console.log(`send Message to ${user.firstname}: ${message}`)
                  app.telegraf.telegram.sendMessage(user.telegramId, message, {parse_mode:'Markdown'})
                }
              })
            }
            break;
          default:

        }
      }

    }

    res.status(200);
    res.send();
  })
};
