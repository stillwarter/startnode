import path from "path";
import { fileURLToPath } from 'url'

/**
 * 由于我们采用的es module规范，在这种规范下无法使用内置的__dirname变量
 * 所以只有单独处理一下
 */

const __filenameNew = fileURLToPath(import.meta.url)

const __dirnameNew = path.dirname(__filenameNew)

// 运行端口
export const HTTP_PORT = 3090;

// 静态文件绝对路径
export const HTTP_ROOT = path.resolve(__dirnameNew, "./static/");