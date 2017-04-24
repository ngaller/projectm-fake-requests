/**
 * Serve fake responses for the RFI Mobile App
 */

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  fs = require('fs')

const server = express()
server.use(bodyParser.json())
server.use(morgan('dev'))

server.post('/Authentication/Authenticate', (req, res) => {
  const {Username, Password} = req.body
  if(Username == 'test' && Password == 'test') {
    res.status(200).json({
      "UserId": "someuserid",
      "AccessToken": "trsnirsttnrsierststrrtrsur93q98",
      "DeviceSecret": "tneistrntrsniarseinniaer"
    })
  } else {
    res.status(500).json({
      Message: 'Authentication Failed'
    })
  }
})

server.get('/Job/GetJobSummary', (req, res) => {
  res.status(200).send("3")
})

server.get('/Job/GetJobs', (req, res) => {
  // res.contentType = 'application/json'
  // res.contentEncoding = 'utf-8'
  fs.readFile('samples/GetJobs.json', (err, data) => {
    res.setHeader("Content-Type", "application/json")
    res.send(data)
  })
})

// a slow version to test iOS background fetch
server.get('/Job/GetJobsSlow', (req, res) => {
  console.log('starting get job timeout...')
  setTimeout(() => {
    // res.contentType = 'application/json'
    // res.contentEncoding = 'utf-8'
    fs.readFile('samples/GetJobs.json', (err, data) => {
      res.header("Content-Type", "application/json")
      res.send(data)
    })
  }, 40000)
})

server.post('Job/WriteJob', (req, res) => {
  res.status(200).json({
    Id: req.body.Id
  })
})

server.get('Job/Profile', (req, res) => {
  fs.readFile('samples/Profile.json', (err, data) => {
    res.header("Content-Type", "application/json")
    res.send(data)
  })
})

server.listen(process.env.PORT || 3000)
