import { sleep, group } from 'k6'
import { getHeader } from '../config/headers.js'
import { configIterations, configStages, configVus } from '../config/config.js'
import { generateUser } from '../helpers/generatePayload.js'
import signup from '../scripts/signup/signup.js'

export const options = configStages

export default function () {
  group('Post Users', () => {
    const payload = generateUser()
    const headers = getHeader()

    signup(payload, headers)
  })
}
