export const configStages = {
  stages: [
    { duration: '2m', target: 20 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95) < 2000'],
    http_req_failed: ['rate < 0.1']
  }
}

export const configStress = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '2m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '2m', target: 300 },
    { duration: '2m', target: 400 },
    { duration: '2m', target: 400 },
    { duration: '5m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95) < 2000'],
    http_req_failed: ['rate < 0.1']
  }
}

export const configIterations = {
  scenarios: {
    execution_per_vus_iteration: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 5,
      startTime: '1s',
      maxDuration: '1m'
    }
  },
  tresholds: {
    http_req_duration: ['p(95) < 2000'],
    http_req_failed: ['rate < 0.1']
  }
}

export const configVus = {
  vus: 50,
  iterations: 150,
  thresholds: {
    //95% das requisições devem responder em até 1.5s
    http_req_duration: ['p(95) < 1500'],
    //requisições com falha devem ser de até 5%
    http_req_failed: ['rate < 0.05']
  }
}

export const configSmoke = {
  vus: 1,
  duration: '30s',
  thresholds: {
    //95% das requisições devem responder em até 1.5s
    http_req_duration: ['p(95) < 1500'],
    //requisições com falha devem ser de até 5%
    http_req_failed: ['rate < 0.05']
  }
}
