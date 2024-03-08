import { sleep, group } from 'k6'
import { getHeader, getHeaderPart } from '../../config/headers.js'
import { configStages, configStress, configSmoke } from '../../config/config.js'
import postimage from '../../scripts/imagelite/image/postimage.js'
import { getToken } from '../../scripts/imagelite/token/gettoken.js'

export function setToken() {
    const token = getToken();
    return token;
  }

export const options = configSmoke

export default function () {
    const token = setToken()

    postimage(token.accessToken)
    sleep(1)
}
