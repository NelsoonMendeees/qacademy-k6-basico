import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter, Rate, Trend } from 'k6/metrics'

export const url = 'http://localhost:3333/signup'

export let postUserDuration = new Trend('checkDuration')

export let postUserFailConter = new Counter('checkErrors')

export let postUserFailRate = new Rate('checkFailRate')

export let postUserSuccessRate = new Rate('checkSuccessRate')

export let postUserRequisitionRate = new Rate('checkRequisitionRate')

export default function (payload, headers) {
  const response = http.post(url, payload, headers)

  let duration = response.timings.duration / 1000
  let durationFormatted = duration.toFixed(2)

  postUserDuration.add(durationFormatted)

  postUserFailRate.add(response.status === 0 || response.status > 399)

  postUserRequisitionRate.add(1)

  if (check(response, { 'status should be 201': (res) => res.status === 201 })) {
    postUserSuccessRate.add(1)
  } else {
    postUserFailConter.add(1)
    console.log('Error Response: ', response.body)
  }
  sleep(1)
}
