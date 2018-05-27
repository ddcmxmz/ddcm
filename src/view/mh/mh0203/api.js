import {server} from '@/tools/servers'

export class CarouselApi {
  // 获取列表
  static GetListApi() {
    return server.connection('GET', `MH0203/A01`)
  }

  // 新增
  static AddApi() {
    return server.connection('POST', `MH0203/A02`)
  }

  // 编辑
  static EditorApi(data = {}, fileList = []) {
    return server.connection('Post', `MH0203/A03`, data, fileList, 'file')
  }

  // 删除
  static DeleteApi(params = {}) {
    return server.connection('Post', `MH0203/A04`, params)
  }
}
