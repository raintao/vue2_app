import {ROUTER_QUERY} from './mutation-types'

export default{
  [ROUTER_QUERY](state,query){
    state.count+=query;
  }
}
