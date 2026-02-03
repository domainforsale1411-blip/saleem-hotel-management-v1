const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const TOTAL_REQUESTS = 100;
const CONCURRENCY = 10;
let completed = 0;
let errors = 0;
const startTime = Date.now();

const makeRequest = () => {
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        completed++;
        resolve();
      });
    });

    req.on('error', (e) => {
      errors++;
      completed++;
      resolve();
    });

    req.end();
  });
};

const runLoadTest = async () => {
  console.log(`Starting load test: ${TOTAL_REQUESTS} requests, concurrency ${CONCURRENCY}...`);
  
  const batches = Math.ceil(TOTAL_REQUESTS / CONCURRENCY);
  
  for (let i = 0; i < batches; i++) {
    const promises = [];
    for (let j = 0; j < CONCURRENCY; j++) {
      if (i * CONCURRENCY + j < TOTAL_REQUESTS) {
        promises.push(makeRequest());
      }
    }
    await Promise.all(promises);
  }

  const duration = (Date.now() - startTime) / 1000;
  const rps = TOTAL_REQUESTS / duration;

  console.log('Load Test Completed:');
  console.log(`Duration: ${duration.toFixed(2)}s`);
  console.log(`Total Requests: ${completed}`);
  console.log(`Errors: ${errors}`);
  console.log(`Requests per second: ${rps.toFixed(2)}`);
};

// Only run if called directly
if (require.main === module) {
  runLoadTest();
}
