// 封装快速获取和设置本地存储的方法

// 获取数据的方法

// key
export function getLocal(key) {
  let data = localStorage.getItem(key); // null undifind
  // 如果可以JSON.parse就转换
  // 如果不支持JSON.parse 直接返回原始数据
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
  return data;
}

// key 数据
export function setLocal(key, data) {
  localStorage.setItem(
    key,
    typeof data === "object" ? JSON.stringify(data) : data
  );
}
