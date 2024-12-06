// 获取当前脚本的 URL
const currentScriptSrc = document.currentScript.src;

// 使用 URL 对象解析查询字符串
const url = new URL(currentScriptSrc);
const params = new URLSearchParams(url.search);

// 获取参数
const name = params.get('name');
const age = params.get('age');

// 使用参数
console.log('Hello, ' + name + '! You are ' + age + ' years old.');
