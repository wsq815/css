/**
 * @author [小缘]
 * @email [1440806569@qq.com]
 * @create date 2017-10-21 11:12:08
 * @modify date 2017-10-21 11:12:08
 * @desc [数据验证规则]
*/
export default class {
  $rules = {
    // 必填
    required (value) {
      return value.replace(/(^\s*)|(\s*$)/g, '') ? true : false;
    },
    // 长度验证
    length (value, length) {
      const reg = new RegExp('^\\S{' + length[0] + ',' + length[1] + '}$');
      return reg.test(value);
    },
    // 邮箱
    email: /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i,
    // ip地址
    ip: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    // url
    url: /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    // 手机号码-1开头 0-9 总共十一位
    phone: /^1[0-9]{10}$/,
    // 汉字
    chineseFont: /^[\u4e00-\u9fa5],{0,}$/,
    // 数字
    number: /^[0-9]*$/,
    // 字母
    letter: /^[a-z]+$/i
  }
}
