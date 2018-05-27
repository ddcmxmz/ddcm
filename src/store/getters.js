export const getters = {
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  accountPwd: state => state.user.accountPwd,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
};
