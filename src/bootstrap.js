const app = require('./app');

app.service('users').create([
  {
    telegramId:'144373760',
    jiraKey:'momme.juergensen',
    firstname:'Momme',
    lastname:'Jürgensen'
  }
]).then(res => {
  console.log(res)
  process.exit();
})
.catch(err => {
  console.log(err);
  process.exit();
})
