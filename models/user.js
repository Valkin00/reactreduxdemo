var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    markers: [
        {
            lat: String,
            lng: String
        }
    ]
});


module.exports = mongoose.model('User', User);