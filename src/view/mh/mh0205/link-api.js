import {server} from '@/tools/servers'

export class LinkApi {
  static GetListApi() { // get//null
    return server.connection('GET', `/MH0205/A01`)
  }

  static EditApi(data = {}) { // post//id,name,link,sort,updated_at
    return server.connection('POST', `/MH0205/A04`, data);
  }

  static DeleteApi(id = {}) { // post//id
    return server.connection('POST', `/MH0205/A05`, id)
  }

  static AddApi(data = {}) { // post//name,link,sort,
    return server.connection('POST', `/MH0205/A02`, data)
  }

  static GetItemApi(id = {}) { // get//id
    return server.connection('GET', `/MH0205/A03`, id)
  }
}
