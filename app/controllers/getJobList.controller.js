const express = require('express');
const RequestHelper = require('../helpers/request.helper')


const request = new RequestHelper()

class getJobListController {
    async joblist(req, res) {
        const payload = {
            uri: `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`,
            json: true,
        }
        var resp = {}
        const response = await request.requestGet(payload)
        resp = response
        if(req.query.location || req.query.description || req.query.full_time ){
            var newresp = resp.filter(({location, description, type}) =>
                req.query.full_time ? location.includes(req.query.location) && type == "Full Time" || description.includes(req.query.description) && type == "Full Time" :location.includes(req.query.location) || description.includes(req.query.description) 
            );
            resp = newresp
        }

        if(req.query.page){
            const page = parseInt(req.query.page);
            const limit = 5;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results  = resp.slice(startIndex, endIndex);
            resp = results;
        }
        res.status(200).json(resp)
    }
}

module.exports = getJobListController
