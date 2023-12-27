/**
 * 自动获取本月已经过天数
 *
 * 另外注意Date对象用1表示一个月中的第一天，但用0表示一年中的第一个月。
 * 所以加一才是实际月份数
 * https://www.cnblogs.com/xia-feng/p/11482062.html
 */

const date = new Date();

export function getPassMouth() {
  const year = date.getFullYear();
  const mouth = date.getMonth() + 1;
  const day = date.getDate();
  return { year, mouth, day };
}
