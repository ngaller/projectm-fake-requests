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
  setTimeout(() => {
    fs.readFile('samples/GetJobs.json', (err, data) => {
      res.send(200, data)
    })
  }, 6000)
  return next()
})

server.listen(process.env.PORT)
