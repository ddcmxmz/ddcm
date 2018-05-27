import {tableServer} from '../../../tools/servers';

export class DataTypeApi {
  static GetDataType(page, pageSize) {
    return tableServer.connection('GET', `/CFModelDataType/ShowDataType`, {page, pageSize});
  }

  static GetAllDataType() {
    return tableServer.connection('GET', `/CFModelDataType/ShowAllDataType`);
  }

  static AddDataType(data = {}) {
    return tableServer.connection('POST', `/CFModelDataType/AddDataType`, data);
  }

  static DeleteDataType(id) {
    return tableServer.connection('POST', `/CFModelDataType/DeleteDataType?id=${id}`);
  }

  static EditDataType(data = {}) {
    return tableServer.connection('POST', `/CFModelDataType/EditDataType`, data);
  }
}
