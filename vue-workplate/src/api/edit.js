/**
 * 上传md编辑器的内容
 */

import request from "../tool/request";

export function getTest(data) {
  return request({
    url: "/myplan/addMyPlan",
    method: "post",
    data,
  });
}

export function postImg(data) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "/postimg",
    method: "post",
    data,
  });
}
