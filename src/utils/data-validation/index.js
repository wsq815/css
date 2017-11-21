/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-10-21 11:11:19
 * @modify date 2017-10-21 11:11:19
 * @desc [数据验证 - 支持服务端和客户端]
*/

import Rules from './rules';

export default class extends Rules {
  constructor (data, rules) {
    super();
    this.$data = data;
    this.$matchRule = rules;
  }
  // 验证通过
  passes () {
    const matchRule = this.$matchRule;
    // 结果
    for (let key in matchRule) {
      // 规则列表
      const rulesList = this.$rules;
      // 当前数据
      const data = this.$data[key];
      // 当前验证规则
      const rule = matchRule[key];
      // 错误信息
      let errorMessage = '';
      if (Array.isArray(rule)) {
        // 遍历所有规则
        for (let item in rule) {
          item = rule[item];
          const type = item.type;
          // 必填
          if (item.required) {
            if (!rulesList.required(data)) {
              errorMessage = item.message || `${key}不能为空`;
              break;
            }
          } else if (type) {
            // 判断规则是否存在
            if (rulesList[type]) {
              let error = false;
              switch (type) {
                case 'length':
                  error = rulesList.length(data, item.length);
                  break;
                default:
                  error = rulesList[type].test(data);
                  break;
              }
              // 状态判断
              if (!error) {
                errorMessage = item.message || `${key}验证失败`;
                break;
              }
            } else {
              errorMessage = `${type}规则不存在`;
            }
          }
        }
      } else if (typeof rule === 'function') {
        // 自定义验证
        errorMessage = rule(data);
      }
      if (errorMessage) {
        throw new Error(errorMessage);
        break;
      }
    }
  }
  // 验证
  validation (value, rule) {
    return this.$rules[rule].test(value);
  }
}
