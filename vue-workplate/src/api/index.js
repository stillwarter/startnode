import request from "../tool/request";

export function getTest(data) {
  return request({
    url: "/",
    method: "post",
  });
}

export function getProcess() {
  return request({
    url: "/baseinfo",
    method: "post",
  });
}
