const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;

router.get('/', (req, res) => {
    res.send('hello express')
})

router.get('/ps', (req, res) => {
    const cmdStr = 'ps -ef';
    exec(cmdStr, (err, stdout, stderr) => {
        if (err) {
            res.send(err);
        } else {
            res.send(stdout);
        }
    })
})