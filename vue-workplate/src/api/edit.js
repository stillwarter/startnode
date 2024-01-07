/**
 * 上传md编辑器的内容
 * https://www.cnblogs.com/hjk1124/p/15177240.html
 */

import dayjs from "dayjs";
import request from "../tool/request";

/**
 * 编辑内容上传
 */
export function postPlanMd(data) {
  return request({
    url: "/myplan/addMyPlan",
    method: "post",
    data,
  });
}

// 由于body传参是buffer，所以不好直接传时间，使用query+body的混合传参模式
export function postImg(data) {
  const update = dayjs(new Date().now).format("YYYY-MM-DD HH:mm:ss");
  return request({
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    url: `/postimg?update=${update}`,
    method: "post",
    // data,
    data, // 重点1，直接将原始二进制流赋给data
    headers: {
      "Content-Type": "application/octet-stream", // 重点2
    },
  });
}
