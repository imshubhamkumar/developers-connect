const mongoose = require('mongoose')
const Schema = mongoose.Schema
var bcrypt = require('bcrypt')
const { string } = require('prop-types')
const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
    userType: { type: String, require: false, default: 'basic' },
    fullName: { type: String, require: false },
    email: { type: String, require: false },
    password: { type: String, require: false },
    location: { type: String, require: false },
    education: { type: String, require: false },
    university: { type: String, require: false },
    rank: { type: Number, require: false, default: 0 },
    challengesSolved: { type: String, require: false },
    solutionSubmitted: { type: String, require: false },
    solutionAccepted: { type: String, require: false },
    dataStructure: { type: String, require: false },
    algorithms: { type: String, require: false },
    cpp: { type: String, require: false },
    html: { type: String, require: false },
    java: { type: String, require: false },
    javascript: { type: String, require: false },
    python: { type: String, require: false },
    followers: { type: Array, require: false, default: [] },
    following: { type: Array, require: false, default: [] },
    voted: { type: Array, require: false, default: [] },
    votes:  {type: String, require: false, default: '0' },
    timestamp: { type: Number, require: false, default: toTimestamp(new Date()) },
    deviceType: { type: String, require: false, default: 'computer' },
    active: { type: String, require: false },
});

UserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })    
})

const Users = mongoose.model('users',UserSchema);

module.exports = Users;

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

