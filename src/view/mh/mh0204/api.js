import {server} from '@/tools/servers'

export class Mh0204Api {
  static GetNgListApi(data = {}) {
    return server.connection('GET', `/MH0204/A01`, data)
  }
  static AddNgApi(data) {
    return server.connection('POST', `/MH0204/A02`, data)
  }
  static DeleteNgApi(id) {
    return server.connection('DELETE', `/MH0204/A05?id=${id}`)
  }
  static GetNgApi(data) {
    return server.connection('GET', `/MH0204/A03`, data)
  }
  static EditeNgApi(data) {
    return server.connection('PUT', `/MH0204/A04`, data)
  }
}
