/*
  name: ajax请求库
  date: 2017-05-06
*/

'use strict';

import axios from 'axios';

// 默认配置
const config = {
  // 服务器地址
  apiPath: 'http://139.196.127.166:7080/'
};

function request (url, options = {}) {
  // 设置token
  options = Object.assign({
    method: 'post'
  }, options);
  // 判断是否自动添加服务器地址
  url.indexOf('http') !== 0 && (url = config.apiPath + url);
  // 执行请求
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: options.method,
      data: options.data,
      params: options.params
    }).then((res) => {
      res = res.data;
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res.message);
      }
    }).catch((error) => {
      // 请求失败
      return reject(error.message || '请求失败');
    });
  });
}

function install (Vue) {
  Object.defineProperty(Vue.prototype, '$ajax', {
    value: request
  });

  // 接口地址
  Object.defineProperty(Vue.prototype, '$apiPath', {
    value: config.apiPath
  });
}

export default install;
