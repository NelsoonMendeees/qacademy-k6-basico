import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'

export const url = 'http://localhost:3333/signup'

export let postUserFailConter = new Counter('checkErrors')

export let postUserFailRate = new Rate('checkFailRate')

export let postUserSuccessRate = new Rate('checkSuccessRate')

export let postUserRequisitionRate = new Rate('checkRequisitionRate')

export default function (payload, headers) {
  const response = http.post(url, payload, headers)

  postUserFailRate.add(response.status === 0 || response.status > 399)

  if (check(response, { 'status should be 201': (res) => res.status === 201 })) {
    postUserRequisitionRate.add(1)
    postUserSuccessRate.add(1)
  } else {
    postUserFailConter.add(1)
    console.log('Error Response: ', response.body)
  }
  sleep(1)
}
