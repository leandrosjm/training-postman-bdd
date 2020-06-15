const newman = require('newman');

newman.run({
    collection: require('./Testing_with_BDD.postman_collection.json'),
    environment: require('./heroku.postman_environment.json'),
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});

