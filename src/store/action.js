import {ROUTER_QUERY} from './mutation-types'

export default{
  routerQuery({commit},query){
    commit(ROUTER_QUERY,query)
  }
}
