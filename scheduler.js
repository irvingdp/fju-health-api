const schedule = require('node-schedule');

var threeAmScheduler = schedule.scheduleJob('0 0 3 * * *', function () {
    // TODO: Ivan, everyday at 3am here...
});

var eightAmScheduler = schedule.scheduleJob('0 0 8 * * *', function () {
    // TODO: Ivan, everyday at 8am here...
});

// uncomment the following to verify your cron expression
/*
const parser = require('cron-parser');
try {
    var interval = parser.parseExpression('0 0 3 * * *', {
        currentDate: new Date('Wed, 26 Dec 2012 12:38:53 UTC'),
        iterator: true
    });

    while (true) {
        try {
            var obj = interval.next();
            console.log('value:', obj.value.toString(), 'done:', obj.done);
        } catch (e) {
            break;
        }
    }
} catch (err) {
    console.log('Error: ' + err.message);
}*/