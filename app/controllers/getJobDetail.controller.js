const express = require('express');
const RequestHelper = require('../helpers/request.helper')


const request = new RequestHelper()

class getJobDetailController {

    async jobDetail(req, res) {
        const payload = {
            uri: `http://dev3.dansmultipro.co.id/api/recruitment/positions/${req.body.id}`,
            json: true,
        }
        const response = await request.requestGet(payload)
        res.status(200).json(response)
    }
}

module.exports = getJobDetailController
