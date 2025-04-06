const os = require('os');

console.log({
  'Platform': os.platform(),
  'Architecture': os.arch(),
  'CPUs': os.cpus(),
  'Total Memory': os.totalmem() / 1024 / 1024 / 1024,
  'Up time': os.uptime() / 60 / 60 / 24,
})