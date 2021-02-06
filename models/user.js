const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	}
});

UserSchema.plugin(passportLocalMMongoose);

module.exports = mongoose.model('User', UserSchema);
