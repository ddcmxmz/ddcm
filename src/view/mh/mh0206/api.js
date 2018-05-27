import {server} from '@/tools/servers'

export class BusinessApi {
  // 获取办事服务列表
  static GetListApi() {
    return server.connection('GET', `MH0206/A01`)
  }

  // 获取办事服务详情
  static GetItemApi(id = {}) {
    return server.connection('GET', `MH0206/A03`, id)
  }

  // 新增办事服务
  static AddApi(data = {}, fileList = []) {
    return server.connection('POST', `MH0206/A02`, data, fileList, 'icon')
  }

  // 编辑办事服务
  static EditorApi(data = {}, fileList = []) {
    return server.connection('POST', `MH0206/A04`, data, fileList, 'icon')
  }

  // 删除办事服务
  static DeleteApi(id = {}) {
    return server.connection('POST', `MH0206/A05`, id)
  }
}
