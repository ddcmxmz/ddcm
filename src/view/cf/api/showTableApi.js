import {tableServer} from '../../../tools/servers';

export class ShowTableApi {
  static GetTitle(modelId) {
    return tableServer.connection('GET', `/CFCreateTable/ShowTable`, {modelId});
  }

  static GetData(page, pageSize, modelId) {
    return tableServer.connection('GET', `/CFCreateTable/ShowTableData`, {page, pageSize, modelId});
  }

  static AddData(data) {
    return tableServer.connection('POST', `/CFCreateTable/AddTableData`, data);
  }

  static EditData(data) {
    return tableServer.connection('POST', `/CFCreateTable/EditTableData`, data);
  }

  static DeleteData(modelId, id) {
    return tableServer.connection('POST', `/CFCreateTable/DeleteTableData?modelId=${modelId}&id=${id}`);
  }
}
