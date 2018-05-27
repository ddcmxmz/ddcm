import {server} from '../../../tools/servers';

export class MH0207Api {
  // 获取所有信件
  static GetAllMail(search = {}) {
    return server.connection('GET', `/MH0207/A01`, search);
  }

  // 获取信件详细信息
  static GetMailMassage(id) {
    return server.connection('GET', `/MH0207/A01/${id}`);
  }

  // 转发其他单位
  static SendToOthers(params) {
    return server.connection('POST', '/MH0207/A03', params);
  }

  // 信件办理结果提交
  static HandleEmail(params) {
    return server.connection('POST', '/MH0207/A04', params);
  }

  // 修改信件状态
  static ChangeMailStatus(id) {
    return server.connection('POST', `/MH0207/A05/${id}`)
  }

  // 获取提交单位
  static GetToOrganizationApi() {
    return server.connection('GET', 'MH0105/A03')
  }
}
