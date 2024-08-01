const express = require('express');
const winston = require('winston');
require('./opentelemetry');

const app = express();

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new (require('winston-loki'))({
      host: 'http://localhost:3100', // Loki endpoint
      labels: { job: 'nodejs-app' }
    })
  ],
});

app.use(express.json());
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getData',(req,res)=>{
    let data={
        name:"magesh",
        workeat:"payoll"
    }
    logger.info('Request received', {
        method: req.method,
        url: req.url,
        data: data
    });
    res.send(`${"its working"}`)
})

app.get('/error',(req,res)=>{
    let data={
        messag:"Something went wrong",
        errorCode:"901"
    }
    logger.error('Request received', {
        method: req.method,
        url: req.url,
        data: data
    });
    res.send(`${"its working"}`)
})

app.listen(3000, () => {
  logger.info('Server running on http://localhost:3000');
});
