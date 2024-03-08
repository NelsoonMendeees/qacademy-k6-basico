import http from "k6/http";
import { check } from "k6";
import { FormData } from "https://jslib.k6.io/formdata/0.0.2/index.js";
import uuid from "../../../helpers/uuid.js";

export const img = open("../../../helpers/images/BI.png", 'b');

export default function (token) {
  const url = "http://localhost:8080/v1/images";

  const formdata = new FormData();
  formdata.append("name", `TESTE PERFORMANCE ${uuid.v4().substring(24)}`);
  formdata.append("tags", "teste");
  formdata.append('file', { data: new Uint8Array(img).buffer, filename: 'BI.png', content_type: 'image/png' });


  const res = http.post(url, formdata.body(), {headers:{
    "Content-Type": "multipart/form-data;  boundary=" + formdata.boundary ,
    "Authorization": `Bearer ${token}`,
  }});

  if (check(res, { "status should be 201": (res) => res.status === 201 })) {
  } else {
    console.log("Error Response: ", res);
  }
}
