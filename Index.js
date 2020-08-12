
var redis = require('redis');
//Connect to redis server 
var client = redis.createClient('6379', '192.168.1.108');
client.on('connect', function () {
    console.log('connected');
});

// using rpush and rpop functions
client.set('Application', 'I am NodeJS Client');
client.get('Application', function (err, reply) {
    console.log(reply);
});

// using rpush and rpop functions
client.rpush(['Countries', 'India', 'US', 'UK']);
client.rpop('Countries', function (err, reply) {
    console.log(reply);
});

// using hmset and hgetall functions

user = { "Name": "DK", "Mobile": "123456789", "Address": "Delhi", "Location": "TML" }
client.hmset('myAddress', user)

client.hgetall('myAddress', function (err, results) {
    console.log(results);
});

/// using sadd,smembers,srandommember and spop function
client.sadd('Contacts', '88958695805', function (err, results) {
    console.log(results);
});

client.smembers('Contacts', function (err, reply) {
    console.log(reply);
});
client.srandmember('Contacts', function (err, reply) {
    console.log(reply);
});
client.spop('Contacts', function (err, reply) {
    console.log(reply);
});


//how to store json in Redis
var jsondata = {
    "Name": "DK",
    "Mobile": "8958965895",
    "Address": {
        "Country": "India",
        "City": "Bangalore"
    }

};
var jsonAsString = JSON.stringify(jsondata);
client.set('EMP01', jsonAsString, function (err, reply) {
    console.log(reply);
});
client.get('EMP01', function (err, reply) {
    var stringAsJson = JSON.parse(reply);
    console.log(stringAsJson);
});
