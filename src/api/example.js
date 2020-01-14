import { request } from '@/utils/index'
import {
  exampleMap
} from '@/api/exampleMap'

/**
 * example
 * @param {Object} params 入参
 * @return {Promise}
 */
export function example(params) {
  return request({
    url: '/common/example',
    method: 'post',
    map: exampleMap,
    params
  })
}
