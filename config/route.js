const LoginController = require('../app/controllers/login.controller')
const getJobListController = require('../app/controllers/getJobList.controller')
const getJobDetailController = require('../app/controllers/getJobDetail.controller')
const auth = require("../app/middleware/auth");

const login = new LoginController()
const jobList = new getJobListController()
const jobDetail = new getJobDetailController()

module.exports.route = (app) => {
    app.post('/login', login.login)
    app.post('/job/list',auth, jobList.joblist)
    app.post('/job/detail',auth, jobDetail.jobDetail)
}
