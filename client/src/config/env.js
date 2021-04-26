if(process.env.NODE_ENV === 'production') {
    module.exports.API_URL = ''
} else {
    module.exports.API_URL = 'http://localhost:5000'
}