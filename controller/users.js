const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const User = require('../modal/Users');
const {signRefreshToken, ensureAuthenticated} = require('../utilities/authService');


router.get('/', (req, res) => {
    res.send("Hello World!")
})

router.get('/users_list', ensureAuthenticated, async (req, res) => {
    const users = await User.find({userType: 'basic'})
    return res.status(200).json({status: true, data: users})
})

router.get('/latest_users_list', ensureAuthenticated, async (req, res) => {
    const users = await User.find({userType: 'basic'}).sort({'createdAt': -1}).limit(10)
    return res.status(200).json({status: true, data: users})
})

router.get('/top_users_list', ensureAuthenticated, async (req, res) => {
    //const users = await User.find({userType: 'basic'}).sort('createdAt').limit(10)
    const users = await User.aggregate([
        {$match: {$and: [{userType: 'basic'}]}},
        {$unwind: '$dataStructure'},
        {$unwind: '$algorithms'},
        {$unwind: '$javascript'},
        {$unwind: '$html'},
        {$unwind: '$java'},
        {$unwind: '$python'},
        {$unwind: '$cpp'},
        {$group:{
            _id: {
                'id': '$_id',
                'fullName': '$fullName',
                'email': '$email',
                'university': '$unversity',
                'location': '$location',
                'deviceType': '$deviceType'
            },
            percentile: { $sum: { $add: ['$dataStructure', '$algorithms', '$javascript', '$html', '$java', '$python', '$cpp']}}
        }},
        {$project: {
            '_id': 0,
            'userId': '$_id.id',
            'fullName': '$_id.fullName',
            'percentile': '$percentile',
            'email': '$_id.email',
            'university': '$_id.unversity',
            'location': '$_id.location',
            'deviceType': '$_id.deviceType'
        }},
        {$sort: {percentile: -1}}
    ])
    return res.status(200).json({status: true, data: users})
})

router.get('/getUserDetails/:id', ensureAuthenticated, async (req, res) => {
    const user = await User.findOne({ _id: req.params.id}, {_v: false});
    const greater = await User.countDocuments({percentile: {$gt: user.percentile}})
    const same = await User.countDocuments({percentile: user.percentile, createdAt: {$gt: user.createdAt}})
    user.rank = greater + same + 1;
    return res.status(200).json({status: true, data: user})
})

router.get('/deleteUser/:id', ensureAuthenticated, async (req, res) => {
    User.deleteOne({_id: req.params.id}, (err, data) => {
        if (err) {
            return res.status(200).json({status: false, data: 'Error'})
        } else{
            return res.status(200).json({status: true, data: 'User deleted'})
        }
    })
})

router.get('/userLogout/:userId', async (req, res) => {
    User.updateOne({_id: req.params.userId}, {active: false}, (err, data) => {
        if(err) {
            return res.status(200).json({status: false, data: 'Error while logging out please try again'})
        } else {
            return res.status(200).json({status: true, data: 'You are logged out successfully.'})
        }
    })
})

router.get('/getDevicesShare', ensureAuthenticated, async (req, res) => {
    const desktop = await User.countDocuments({deviceType: 'desktop', userType: 'basic'});
    const tablat = await User.countDocuments({deviceType: 'tablate', userType: 'basic'});
    const mobile = await User.countDocuments({deviceType: 'mobile', userType: 'basic'});
    const data = {
        desktop,
        mobile,
        tablat    }
    res.status(200).json({status: true, data});
})

router.get('/getUserNumbers', ensureAuthenticated, async (req, res) => {
    const activeUsers = await User.countDocuments({active: true});
    const totalUsers = await User.countDocuments({userType: 'basic'});
    const data = {
        activeUsers,
        totalUsers
    }
    res.status(200).json({status: true, data});
})



router.post('/signUp', async (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        education: req.body.education,
        university: req.body.university,
        challengesSolved: req.body.cs,
        solutionSubmitted: req.body.ss,
        solutionAccepted: req.body.sa,
        dataStructure: req.body.ds,
        algorithms: req.body.algo,
        cpp: req.body.cpp,
        html: req.body.html,
        java: req.body.java,
        javascript: req.body.js,
        python: req.body.py,
        deviceType: req.body.deviceType
    })

    user.save((err, data) => {
        if (err) {
            return res.status(200).json({status: false, error:'There was an error while adding new user'})
        } else {
            return res.status(200).json({status: true, message: 'The new user signedup successfuly.'});
        }
    })
})

router.post('/changePassword/:id', ensureAuthenticated, async (req, res) => {
    const newPassword = await User.hashThePassword(req.body.newPassword)
    User.updateOne({_id: req.params.id}, {password: newPassword}, (err, data) => {
        if (err) {
            return res.status(200).json({status: false, error:'There was an error while updating new password'})
        } else {
            return res.status(200).json({status: true, message: 'The new password updated successfuly.'});
        }
    })
})

router.post('/login', async (req, res, next) => {
    const user = await User.countDocuments();
    if (user <= 0) {
        const firstUser = new User({
            fullName: 'Admin',
            email: 'admin@devwork.com',
            password: 'admin',
            userType: 'admin'
        })
        firstUser.save();
    } else {
        passport.authenticate('local', (err, user) => {
            if (err)  return next(err);
            if (!user) {
                return res.status(200).json({status: false, errors: 'Email/Password is wrong.'})
            }
            req.logIn(user, async (err) => {
                if (err) {  
                    return next(err)
                }
                const accessToken = await signRefreshToken(user.email)
                const refreshToken = await signRefreshToken(user.email)
                User.updateOne({_id: user._id}, {active: true}, (err, data) => {
                    if(err) {
                        return res.status(200).json({status: false, data: 'Error while login please try again'})
                    } else {
                        return res.status(200).json({status: true, message: 'Login Successfull', accessToken: accessToken, refreshToken: refreshToken, user})
                    }
                })
            })
        })(req, res, next)
    }
})

passport.use(new LocalStrategy({usernameField: 'email'},
    (email, password, done) =>{
        User.findOne({email: email}, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'There is no user with this email id.' });
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    return done(err)
                }
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    User.findOne({ _id: user._id }, (err, user) => {
        done(err, user)
    })
})

module.exports = router;