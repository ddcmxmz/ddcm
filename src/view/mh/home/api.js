import {server} from '@/tools/servers'

export class Upload {
  /**
   * @param params 表单参数
   * @param fileList 附件list
   * @returns {Promise<any>}
   * @constructor
   */
  static PostUpload(params = {}, fileList = []) {
    return server.connection('POST', `/MH0206/A02`, params, fileList, 'icon')
  }
}
