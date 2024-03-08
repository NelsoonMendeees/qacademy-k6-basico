
import { sleep, check } from "k6";
import http from 'k6/http'
import { configSmoke, configStages } from "../config/config.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = configSmoke;


export default function () {
    const url = "http://localhost:8080/v1/users/auth"
    const payload = JSON.stringify({"email":"nelson_mendes@live.com","password":"pwd123"})
    const headers = {
        headers: {
          'Content-type': 'application/json'
        }
      }

    const response = http.post(url, payload, headers)

    check(response, { "status should be 200": (res) => res.status === 200 })

    sleep(1);
}

export function handleSummary(data) {
  return {
    "./report/imagelite-smoke.html": htmlReport(data, {
      title: `ImageLite Smoke - 07/03/2024`,
    }),
    stdout: textSummary(data, {
      indent: " ",
      enableColors: true,
    }),
  };
}


//http://localhost:8080/v1/users/auth
