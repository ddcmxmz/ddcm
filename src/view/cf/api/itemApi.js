import {tableServer} from '../../../tools/servers';

export class ItemApi {
  static GetAllTableItem(page, pageSize) {
    return tableServer.connection('GET', `/CFModelItem/ShowAllTableItem`, {page, pageSize});
  }

  static GetTableItem(page, pageSize, modelId) {
    return tableServer.connection('GET', `/CFModelItem/ShowTableItem`, {page, pageSize, modelId});
  }

  static GetTableItemById(id) {
    return tableServer.connection('GET', `/CFModelItem/ShowTableItemById`, {id});
  }

  static AddTableItem(data = {}) {
    return tableServer.connection('POST', `/CFModelItem/AddTableItem`, data);
  }

  static DeleteTableItem(data = {}) {
    return tableServer.connection('POST', `/CFModelItem/DeleteTableItem`, data);
  }

  static EditTableItem(data = {}) {
    return tableServer.connection('POST', `/CFModelItem/EditTableItem`, data);
  }
}
