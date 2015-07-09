
Data = new Mongo.Collection("data");
State = new Mongo.Collection("state");

if (Meteor.isServer) {

  Data.remove({createdAt: {$lt: moment().subtract(1, 'months').toDate()}});

  var exec = Npm.require('child_process').exec;
  var Future = Npm.require('fibers/future');
  var base = process.env.PWD;
  var runScript = function(cmd) {

      // This method call won't return immediately, it will wait for the
      // asynchronous code to finish, so we call unblock to allow this client
      // to queue other method calls (see Meteor docs)
//      this.unblock();
      var future=new Future();
      var realCommand = 'cd ' + base + ' && ' + cmd;

      exec(realCommand,function(error,stdout,stderr){
          if(error){
            future.return([false, stderr.toString()]);
          } else {
            future.return([true, stdout.toString()]);
          }
      });
      return future.wait();
  }

  var collectData = function () {
    var row = {
      light: parseInt(runScript('shell-scripts/licht-status.sh')[1]),
      temp: parseFloat(runScript('shell-scripts/temp-status.sh')[1]),
      hum: parseFloat(runScript('shell-scripts/humidity-status.sh')[1]),
      createdAt: new Date()
    };
    Data.insert(row)

  Data.remove({createdAt: {$lt: moment().subtract(1, 'months').toDate()}});

  }

  var collectState = function () {
    var row = {
      light: parseInt(runScript('shell-scripts/licht-status.sh')[1]),
      water: parseInt(runScript('shell-scripts/wasser-status.sh')[1]),
      temp: parseFloat(runScript('shell-scripts/temp-status.sh')[1]),
      hum: parseFloat(runScript('shell-scripts/humidity-status.sh')[1]),
      createdAt: new Date()
    };

	State.remove({});
    State.insert(row)

  }

  Meteor.setInterval(collectData, 960000);
  Meteor.setInterval(collectState, 2000);
  Meteor.methods({
    lightOn: function () {
      var result = runScript('shell-scripts/licht-an.sh');
      collectState();
      return result;
    },
    lightOff: function () {
      var result = runScript('shell-scripts/licht-aus.sh');
      collectState();
      return result;
    },

    waterOn: function () {
      var result = runScript('shell-scripts/wasser-an.sh');

      return result;
    },

  });
}