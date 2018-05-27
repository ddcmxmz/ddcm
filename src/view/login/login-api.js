import {server} from '@/tools/servers'

/**
 * 登录
 */
export class LoginApi {
  // 登录
  static login (data) {
    return server.connection('POST', 'api/auth/sign_in', data)
  }
}
