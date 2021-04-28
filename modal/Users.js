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
    percentile: { type: Number, require: false, default: 0 },
    challengesSolved: { type: String, require: false },
    solutionSubmitted: { type: String, require: false },
    solutionAccepted: { type: String, require: false },
    dataStructure: { type: Number, require: false, default: 0 },
    algorithms: { type: Number, require: false, default: 0 },
    cpp: { type: Number, require: false, default: 0 },
    html: { type: Number, require: false, default: 0 },
    java: { type: Number, require: false, default: 0 },
    javascript: { type: Number, require: false, default: 0 },
    python: { type: Number, require: false, default: 0 },
    followers: { type: Array, require: false, default: [] },
    following: { type: Array, require: false, default: [] },
    voted: { type: Array, require: false, default: [] },
    votes:  {type: String, require: false, default: '0' },
    timestamp: { type: Number, require: false, default: toTimestamp(new Date()) },
    createdAt: { type: Date, require: false, default: new Date()},
    deviceType: { type: String, require: false, default: 'desktop' },
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

UserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('percentile')) {
        return next()
    }
    const percentile = user.dataStructure + user.algorithms + user.cpp + user.java + user.html + user.javascript + user.python;
    user.percentile = percentile;
})

const Users = mongoose.model('users',UserSchema);

module.exports = Users;

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}

module.exports.hashThePassword = async (newPassword) => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(newPassword, SALT_WORK_FACTOR, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        })
    })
    return hashedPassword;
}

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

