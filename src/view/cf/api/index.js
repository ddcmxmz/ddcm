import {tableServer} from '@/tools/servers'

/**
 * 门户api
 */
export class Table {
  /**
   * 添加表单数据
   * string
   */
  static CFCreateTableAddTableData(data = {}) {
    return tableServer.connection('POST', '/CFCreateTable/AddTableData', data)
  }

  /**
   * 删除表单数据
   * string
   */
  static CFCreateTableDeleteTableData(data = {}) {
    return tableServer.connection('POST', '/CFCreateTable/DeleteTableData', data)
  }

  /**
   * 修改表单数据
   * string
   */
  static CFCreateTableEditTableData(data = {}) {
    return tableServer.connection('POST', '/CFCreateTable/EditTableData', data)
  }

  /**
   * 获取表头
   * string
   */
  static CFCreateTableShowTable(search = {}) {
    return tableServer.connection('GET', '/CFCreateTable/ShowTable', search)
  }

  /**
   * 获取表单数据
   * string
   */
  static CFCreateTableShowTableData(search = {}) {
    return tableServer.connection('GET', '/CFCreateTable/ShowTableData', search)
  }

  /**
   * 新增数据集合
   * string
   */
  static CFDataSetAddDataSet(data = {}) {
    return tableServer.connection('POST', '/CFDataSet/AddDataSet', data)
  }

  /**
   * 删除数据集合
   * string
   */
  static CFDataSetDeleteDataSet(data = {}) {
    return tableServer.connection('POST', '/CFDataSet/DeleteDataSet', data)
  }

  /**
   * 修改数据集合
   * string
   */
  static CFDataSetEditDataSet(data = {}) {
    return tableServer.connection('POST', '/CFDataSet/EditDataSet', data)
  }

  /**
   * 获取所有数据集合
   * string
   */
  static CFDataSetShowDataSet(search = {}) {
    return tableServer.connection('GET', '/CFDataSet/ShowDataSet', search)
  }

  /**
   * 获取单个数据集合
   * string
   */
  static CFDataSetShowDataSetById(search = {}) {
    return tableServer.connection('GET', '/CFDataSet/ShowDataSetById', search)
  }

  /**
   * 新增模板
   * string
   */
  static CFDynamicFormAddData(data = {}) {
    return tableServer.connection('POST', '/CFDynamicForm/AddData', data)
  }

  /**
   * 删除模板
   * string
   */
  static CFDynamicFormDeleteData(data = {}) {
    return tableServer.connection('POST', '/CFDynamicForm/DeleteData', data)
  }

  /**
   * 修改模板
   * string
   */
  static CFDynamicFormEditData(data = {}) {
    return tableServer.connection('POST', '/CFDynamicForm/EditData', data)
  }

  /**
   * 获取所有模板
   * string
   */
  static CFDynamicFormShowAllData(search = {}) {
    return tableServer.connection('GET', '/CFDynamicForm/ShowAllData', search)
  }

  /**
   * 获取单个模型项数据类型
   * string
   */
  static CFDynamicFormShowDataById(search = {}) {
    return tableServer.connection('GET', '/CFDynamicForm/ShowDataById', search)
  }

  /**
   * 分页获取模板
   * string
   */
  static CFDynamicFormShowDataByPage(search = {}) {
    return tableServer.connection('GET', '/CFDynamicForm/ShowDataByPage', search)
  }

  /**
   * 新增表单
   * string
   */
  static CFModelAddTable(data = {}) {
    return tableServer.connection('POST', '/CFModel/AddTable', data)
  }

  /**
   * 验证表单中是否已有数据
   * string
   */
  static CFModelCheckTable(search = {}) {
    return tableServer.connection('GET', '/CFModel/CheckTable', search)
  }

  /**
   * 删除表单
   * string
   */
  static CFModelDeleteTable(data = {}) {
    return tableServer.connection('POST', '/CFModel/DeleteTable', data)
  }

  /**
   * 修改表单
   * string
   */
  static CFModelEditTable(data = {}) {
    return tableServer.connection('POST', '/CFModel/EditTable', data)
  }

  /**
   * 获取所有表单
   * string
   */
  static CFModelShowAllTable(search = {}) {
    return tableServer.connection('GET', '/CFModel/ShowAllTable', search)
  }

  /**
   * 分页获取所有表单
   * string
   */
  static CFModelShowTable(search = {}) {
    return tableServer.connection('GET', '/CFModel/ShowTable', search)
  }

  /**
   * 获取单个表单
   * string
   */
  static CFModelShowTableById(search = {}) {
    return tableServer.connection('GET', '/CFModel/ShowTableById', search)
  }

  /**
   * 新增模型项数据类型
   * string
   */
  static CFModelDataTypeAddDataType(data = {}) {
    return tableServer.connection('POST', '/CFModelDataType/AddDataType', data)
  }

  /**
   * 删除模型项数据类型
   * string
   */
  static CFModelDataTypeDeleteDataType(data = {}) {
    return tableServer.connection('POST', '/CFModelDataType/DeleteDataType', data)
  }

  /**
   * 修改模型项数据类型
   * string
   */
  static CFModelDataTypeEditDataType(data = {}) {
    return tableServer.connection('POST', '/CFModelDataType/EditDataType', data)
  }

  /**
   * 获取所有模型项数据类型(不分页)
   * string
   */
  static CFModelDataTypeShowAllDataType(search = {}) {
    return tableServer.connection('GET', '/CFModelDataType/ShowAllDataType', search)
  }

  /**
   * 获取所有模型项数据类型
   * string
   */
  static CFModelDataTypeShowDataType(search = {}) {
    return tableServer.connection('GET', '/CFModelDataType/ShowDataType', search)
  }

  /**
   * 获取单个模型项数据类型
   * string
   */
  static CFModelDataTypeShowDataTypeById(search = {}) {
    return tableServer.connection('GET', '/CFModelDataType/ShowDataTypeById', search)
  }

  /**
   * 新增表单项
   * string
   */
  static CFModelItemAddTableItem(data = {}) {
    return tableServer.connection('POST', '/CFModelItem/AddTableItem', data)
  }

  /**
   * 删除表单项
   * string
   */
  static CFModelItemDeleteTableItem(data = {}) {
    return tableServer.connection('POST', '/CFModelItem/DeleteTableItem', data)
  }

  /**
   * 修改表单项
   * string
   */
  static CFModelItemEditTableItem(data = {}) {
    return tableServer.connection('POST', '/CFModelItem/EditTableItem', data)
  }

  /**
   * 获取所有表单项
   * string
   */
  static CFModelItemShowAllTableItem(search = {}) {
    return tableServer.connection('GET', '/CFModelItem/ShowAllTableItem', search)
  }

  /**
   * 通过表单(model)id获取所有表单项(不分页)
   * string
   */
  static CFModelItemShowAllTableItemByModelId(search = {}) {
    return tableServer.connection('GET', '/CFModelItem/ShowAllTableItemByModelId', search)
  }

  /**
   * 通过表单(model)id获取所有表单项
   * string
   */
  static CFModelItemShowTableItem(search = {}) {
    return tableServer.connection('GET', '/CFModelItem/ShowTableItem', search)
  }

  /**
   * 获取单个表单项
   * string
   */
  static CFModelItemShowTableItemById(search = {}) {
    return tableServer.connection('GET', '/CFModelItem/ShowTableItemById', search)
  }

}
