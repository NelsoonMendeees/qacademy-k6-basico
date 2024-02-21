import uuid from './uuid.js'

export function generateUser() {
    
  const id = uuid.v4().substring(24)

  const payload = JSON.stringify({
    email: `qa.${id}@gmail.com`,
    password: 'pwd123'
  })

  return payload
}
