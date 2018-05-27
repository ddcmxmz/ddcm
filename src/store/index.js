import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import permission from './permission'
import {getters} from './getters'
import * as ge from './ge'
import * as cf from './cf'
import * as sj from './sj'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    permission,
    ...ge,
    ...cf,
    ...sj,
  },
  getters
});
