import {tableServer} from '../../../tools/servers';

export class TableApi {
  static GetAllTableList(page, pageSize) {
    return tableServer.connection('GET', `/CFModel/ShowTable`, {page, pageSize});
  }

  static GetTableById(id) {
    return tableServer.connection('GET', `/CFModel/ShowTableById?id=${id}`);
  }

  static AddTable(data = {}) {
    return tableServer.connection('POST', `/CFModel/AddTable`, data);
  }

  static DeleteTable(data = {}) {
    return tableServer.connection('POST', `/CFModel/DeleteTable`, data);
  }

  static EditTable(data = {}) {
    return tableServer.connection('POST', `/CFModel/EditTable`, data);
  }

  static CheckTable(modelId) {
    return tableServer.connection('GET', `/CFModel/CheckTable`, {modelId});
  }
}
