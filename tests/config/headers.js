export function getHeader() {
  const headers = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  return headers
}


export function getHeaderPart(token) {
  const headers = {
    headers: {
      'Content-type': 'multipart/form-data; boundary=----WebKitFormBoundarybMKA4nv34HPFSAyT',
      'Authorization': `Bearer ${token}`
    }
  }

  return headers
}
