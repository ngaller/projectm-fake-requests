/**
 * Serve fake responses for the RFI Mobile App
 */

const restify = require('restify'),
  fs = require('fs')

const server = restify.createServer({})
server.use(restify.bodyParser({}))

server.get('/Authentication/Authenticate', (req, res, next) => {
  const {Username, Password} = req.body
  if(Username == 'test' && Password == 'test') {
    res.send(200, {
    })
  } else {
    res.send(500, {
      Message: 'Authentication Failed'
    })
  }
  return next()
})

server.get('/Job/GetJobSummary', (req, res, next) => {
  res.send(200, "3")
  return next()
})

server.get('/Job/GetJobs', (req, res, next) => {
  // res.contentType = 'application/json'
  // res.contentEncoding = 'utf-8'
  fs.readFile('samples/GetJobs.json', (err, data) => {
    res.header("Content-Type", "application/json")
    res.end(data)
  })
  return next()
})

// a slow version to test iOS background fetch
server.get('/Job/GetJobsSlow', (req, res, next) => {
  setTimeout(() => {
    // res.contentType = 'application/json'
    // res.contentEncoding = 'utf-8'
    fs.readFile('samples/GetJobs.json', (err, data) => {
      res.header("Content-Type", "application/json")
      res.end(data)
    })
  }, 40000)
  return next()
})

server.post('Job/WriteJob', (req, res, next) => {
  res.send(200, {
    Id: req.body.Id
  })
  return next()
})

server.get('Job/Profile', (req, res, next) => {
  fs.readFile('samples/Profile.json', (err, data) => {
    res.header("Content-Type", "application/json")
    res.end(data)
  })
})

server.listen(process.env.PORT || 3000)
