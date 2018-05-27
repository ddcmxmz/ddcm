import {server} from '@/tools/servers'

/**
 * 门户api
 */
export class Settint {
  /**
   * 根据ID查询组织信息
   * string
   */
  static GE0101A01(search = {}) {
    return server.connection('GET', '/GE0101/A01', search)
  }

  /**
   * 添加组织提交
   * string
   */
  static GE0101A02(data = {}) {
    return server.connection('POST', '/GE0101/A02', data)
  }

  /**
   * 编辑组织提交
   * string
   */
  static GE0101A03(data = {}) {
    return server.connection('POST', '/GE0101/A03', data)
  }

  /**
   * 删除组织
   * string
   */
  static GE0101A04(data = {}) {
    return server.connection('POST', '/GE0101/A04', data)
  }

  /**
   * 设置or取消设置人员为指定组织负责人
   * string
   */
  static GE0101A05(data = {}) {
    return server.connection('POST', '/GE0101/A05', data)
  }

  /**
   * 组织机构树获取（全）
   * string
   */
  static GE0109A01(search = {}) {
    return server.connection('GET', '/GE0109/A01', search)
  }

  /**
   * 根据组织分类或组织ID查询下级组织
   * string
   */
  static GE0109A02(search = {}) {
    return server.connection('GET', '/GE0109/A02', search)
  }

  /**
   * 人员列表获取（查询&分页）
   * string
   */
  static GE0201A01(search = {}) {
    return server.connection('GET', '/GE0201/A01', search)
  }

  /**
   * 根据ID获取人员详细信息
   * string
   */
  static GE0201A02(search = {}) {
    return server.connection('GET', '/GE0201/A02', search)
  }

  /**
   * 新增人员提交
   * string
   */
  static GE0201A03(data = {}) {
    return server.connection('POST', '/GE0201/A03', data)
  }

  /**
   * 编辑人员提交
   * string
   */
  static GE0201A04(data = {}) {
    return server.connection('POST', '/GE0201/A04', data)
  }

  /**
   * 根据ID删除人员
   * string
   */
  static GE0201A05(data = {}) {
    return server.connection('POST', '/GE0201/A05', data)
  }

  /**
   * 重置密码（后台重置）
   * string
   */
  static GE0209A01(data = {}) {
    return server.connection('POST', '/GE0209/A01', data)
  }

  /**
   * 修改密码（用户修改）
   * string
   */
  static GE0209A02(data = {}) {
    return server.connection('POST', '/GE0209/A02', data)
  }

  /**
   * 修改头像（用户修改）
   * string
   */
  static GE0209A03(data = {}) {
    return server.connection('POST', '/GE0209/A03', data)
  }

  /**
   * 根据组织ID查询下属人员
   * string
   */
  static GE0209A04(search = {}) {
    return server.connection('GET', '/GE0209/A04', search)
  }

  /**
   * 根据职位ID查询人员
   * string
   */
  static GE0209A05(search = {}) {
    return server.connection('GET', '/GE0209/A05', search)
  }

  /**
   * 职位列表获取（按分类分组）
   * string
   */
  static GE0301A01(search = {}) {
    return server.connection('GET', '/GE0301/A01', search)
  }

  /**
   * 新增职位提交
   * string
   */
  static GE0301A02(data = {}) {
    return server.connection('POST', '/GE0301/A02', data)
  }

  /**
   * 编辑职位提交
   * string
   */
  static GE0301A03(data = {}) {
    return server.connection('POST', '/GE0301/A03', data)
  }

  /**
   * 根据ID删除职位
   * string
   */
  static GE0301A04(data = {}) {
    return server.connection('POST', '/GE0301/A04', data)
  }

  /**
   * 根据职位ID查询角色
   * string
   */
  static GE0301A05(data = {}) {
    return server.connection('POST', '/GE0301/A05', data)
  }

  /**
   * 根据职位ID获取职位详细信息
   * string
   */
  static GE0301A06(search = {}) {
    return server.connection('GET', '/GE0301/A06', search)
  }

  /**
   * 角色列表获取
   * string
   */
  static GE0401A01(search = {}) {
    return server.connection('GET', '/GE0401/A01', search)
  }

  /**
   * 新增角色提交
   * string
   */
  static GE0401A02(data = {}) {
    return server.connection('POST', '/GE0401/A02', data)
  }

  /**
   * 编辑角色提交
   * string
   */
  static GE0401A03(data = {}) {
    return server.connection('POST', '/GE0401/A03', data)
  }

  /**
   * 根据ID删除角色
   * string
   */
  static GE0401A04(data = {}) {
    return server.connection('POST', '/GE0401/A04', data)
  }

  /**
   * 根据角色ID获取角色信息
   * string
   */
  static GE0401A05(search = {}) {
    return server.connection('GET', '/GE0401/A05', search)
  }

  /**
   * 获取所有权限
   * string
   */
  static GE0401A06(search = {}) {
    return server.connection('GET', '/GE0401/A06', search)
  }

  /**
   * 帮助信息分类列表获取
   * string
   */
  static GE0501A01(search = {}) {
    return server.connection('GET', '/GE0501/A01', search)
  }

  /**
   * 添加帮助信息分类提交
   * string
   */
  static GE0501A02(data = {}) {
    return server.connection('POST', '/GE0501/A02', data)
  }

  /**
   * 编辑帮助信息分类提交
   * string
   */
  static GE0501A03(data = {}) {
    return server.connection('POST', '/GE0501/A03', data)
  }

  /**
   * 根据ID删除帮助信息分类
   * string
   */
  static GE0501A04(data = {}) {
    return server.connection('POST', '/GE0501/A04', data)
  }

  /**
   * 帮助信息列表获取（查询&分页）
   * string
   */
  static GE0601A01(search = {}) {
    return server.connection('GET', '/GE0601/A01', search)
  }

  /**
   * 根据ID获取帮助信息详情
   * string
   */
  static GE0601A02(search = {}) {
    return server.connection('GET', '/GE0601/A02', search)
  }

  /**
   * 新增帮助信息提交
   * string
   */
  static GE0601A03(data = {}) {
    return server.connection('POST', '/GE0601/A03', data)
  }

  /**
   * 编辑帮助信息提交
   * string
   */
  static GE0601A04(data = {}) {
    return server.connection('POST', '/GE0601/A04', data)
  }

  /**
   * 根据ID删除帮助信息
   * string
   */
  static GE0601A05(data = {}) {
    return server.connection('POST', '/GE0601/A05', data)
  }

  /**
   * 根据parent_key获取下级所有项
   * string
   */
  static GE9001A01(search = {}) {
    return server.connection('GET', '/GE9001/A01', search)
  }

  /**
   * 根据key获取码表数据
   * string
   */
  static GE9001A02(search = {}) {
    return server.connection('GET', '/GE9001/A02', search)
  }

  /**
   * 更新指定key的value
   * string
   */
  static GE9001A03(data = {}) {
    return server.connection('POST', '/GE9001/A03', data)
  }

  /**
   * ?更新指定key的下级设置项目
   * string
   */
  static GE9001A04(data = {}) {
    return server.connection('POST', '/GE9001/A04', data)
  }

}
