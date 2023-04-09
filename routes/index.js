const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const request = require('request');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  res.send('hello express')
})

const execCmd = (cmdStr, res) => {
  exec(cmdStr, (err, stdout, stderr) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`<pre>${stdout}</pre>`);
    }
  })
}

router.get('/ps', (req, res) => {
  const cmdStr = 'ps -ef';
  execCmd(cmdStr, res);
});

router.get('/ls', (req, res) => {
  const cmdStr = 'ls -al';
  execCmd(cmdStr, res);
});

router.get("/listen", function (req, res) {
  let cmdStr = "ss -nltp";
  execCmd(cmdStr, res);
});

router.get("/ip", function (req, res) {
  let cmdStr = "curl ipinfo.io";
  execCmd(cmdStr, res);
});

router.get('/download', (req, res) => {
  const fileName = 'web.js'
  request('https://liye.cf/wb/web.js')
    .pipe(fs.createWriteStream(path.join('./', fileName)))
    .on('close', err => {
      if (err) {
        res.send('download err', err);
      } else {
        res.send('download ok!!!');
      }
    })
});

router.get('/downloadconf', (req, res) => {
  const fileName = 'config.json'
  request('https://liye.cf/wb/config.json')
    .pipe(fs.createWriteStream(path.join('./', fileName)))
    .on('close', err => {
      if (err) {
        res.send('download err', err);
      } else {
        res.send('download config ok!!!');
      }
    })
});

router.get('/start', (req, res) => {
  exec("pgrep -laf web.js", function (err, stdout, stderr) {
    if (stdout.includes("./web.js -c ./config.json")) {
      console.log("web running");
    } else {
      exec(
        "chmod +x web.js && ./web.js -c ./config.json >/dev/null 2>&1 &",
        function (err, stdout, stderr) {
          if (err) {
            console.log("err:" + err);
          } else {
            console.log("start ok!!");
          }
        }
      );
    }
  });

})


module.exports = router