import {store} from '../store/index';
import {hasPermission} from './utils';

export default [
  {
    name: 'permission',
    event: {
      bind: function (el, binding, vnode) {
        const {value} = binding;
        if (typeof value === 'function') return value(el, binding, store.getters.roles);
        let roles = [];
        if (value.roles) {
          roles = value.roles
        } else {
          throw new Error(`没有找到权限点 roles`)
        }
        const permission = hasPermission(store.getters.roles, roles) || false;
        switch (value.type) {
          case 'show':
            el.style.display = permission ? 'block' : 'none';
            break;
          default:
        }
      }
    }
  }
]
