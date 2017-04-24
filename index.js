const restify = require('restify')

const server = restify.createServer({})
server.use(restify.bodyParser({}))

server.get('/Job/GetJobSummary', function(req, res, next) {
  res.send(200, {
    'hello': 'test'
  });
  return next()
})


server.listen(process.env.PORT)
