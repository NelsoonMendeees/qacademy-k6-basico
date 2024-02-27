import { sleep, group } from 'k6'
import { getHeader } from '../config/headers.js'
import { configStages, configStress, configSmoke } from '../config/config.js'
import { generateUser } from '../helpers/generatePayload.js'
import signup from '../scripts/signup/signup.js'

export const options = configStress

export default function () {
  group('Post Users', () => {
    const payload = generateUser()
    const headers = getHeader()

    signup(payload, headers)
    sleep(1)
  })
}


// ativar dashboard  
// K6_WEB_DASHBOARD_PERIOD=2s K6_WEB_DASHBOARD=true k6 run ./test/script.js

// ativar dashboard e exportar report
// K6_WEB_DASHBOARD_PERIOD=2s K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=./report/loadTest.html k6 run ./test/script.js