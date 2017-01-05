var bunyan = require('bunyan');
var hapi = require('hapi');

var server = new hapi.Server();
server.connection({ port: 8000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    request.log.info('just a test');

    reply({ hello: 'world' });
  },
});

var config = [
  {
    register: require('hapi-bunyan'),
    options: {
      logger: bunyan.createLogger({ name: 'test', level: 'debug' }),
    },
  },
  {
    register: require('hapi-request-id')
  },
];

server.register(config, function(err) {
  if (err) throw err;
});

server.start();
