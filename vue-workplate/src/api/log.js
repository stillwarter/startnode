import request from "../tool/request";

export function readMyLog() {
  return request({
    url: "/mylog/readMyLog",
    method: "post",
  });
}
export function addMyLog(data) {
  return request({
    url: "/mylog/addMyLog",
    method: "post",
    data,
  });
}
