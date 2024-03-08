import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

export let getTokenFailConter = new Counter("Check_Error_GET_Token");

export let getTokenSuccessRate = new Counter("Check_Success_Counter_GET_Token");

export let getTokenDuration = new Counter("Check_Duration_GET_Token");

export function getToken() {
  const url = "http://localhost:8080/v1/users/auth";

  const options = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({
    email: "nelson_mendes@live.com",
    password: "pwd123",
  });

  const token = http.post(url, body, options);

  if (token.status === 200) {

    let duration = token.timings.duration;

    if (duration < 4000) {
      getTokenDuration.add(1);
    }

    if (check(token, { "status should be 200": (res) => res.status === 200 })) {
      getTokenSuccessRate.add(1);
      console.log("Success Token");
    } else {
      getTokenFailConter.add(1);
      console.log("Erro GET TOKEN: ", response.body);
    }

    const tk = token.json();

    return tk;
  }
}
