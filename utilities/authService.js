const User = require('../modal/Users');
const JWT = require('jsonwebtoken');
const env = require('../config/env');

module.exports.ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        JWT.verify(token, env.JWT_SCERET, (err, decoded) => {
            if (err) {
                return res.status(401).json({status: 'error', message: 'Unautherised access.'})
            }
            req.decoded = decoded
            User.findOne({ email: decoded.email}, (err, user) => {
                if (err) {
                    return res.status(401).json({status: 'error', message: 'Unautherised access.'})
                }
                if (user) {
                    const currentUser = {
                        id: user._id,
                        userType: user.userType,
                        fullName: user.fullName,
                        email: user.email,
                        password: user.password,
                        location: user.location,
                        education: user.education,
                        university: user.university,
                        rank: user.rank,
                        challengesSolved: user.challengesSolved,
                        solutionSubmitted: user.solutionSubmitted,
                        solutionAccepted: user.solutionAccepted,
                        dataStructure: user.dataStructure,
                        algorithms: user.algorithms,
                        cpp: user.cpp,
                        html: user.html,
                        java: user.java,
                        javascript: user.javascript,
                        python: user.python,
                        followers: user.followers,
                        following: user.following,
                        voted: user.voted,
                        votes: user.votes,
                        deviceType: user.deviceType,
                        active: user.active,

                    }

                    req.user = currentUser
                    next()
                } else {
                    return res.status(401).json({status: 'error', message: 'Unautherised access.'})
                }
            })
        })
    } else {
        return res.status(401).json({status: 'error', message: 'Unautherised access.'})
    }
}

module.exports.signRefreshToken = (email) => {
    return new Promise((resolve, reject) => {
        const payload = {
            email: email
        }
        const secret = env.JWT_SCERET;
        const options = {
            expiresIn:'2h'
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject({error: 'There was an error'})
                return;
            }
            resolve(token)
            return;
        })
    })
}