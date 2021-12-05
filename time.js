export const dateCount = function (eventDate) { // today 和 eventDate 是 yyyy/mm/dd 格式
  const date1 = new Date() // 當天日期
  const date2 = new Date(eventDate) // 演唱會日期
  const days = parseInt((date2 - date1) / 1000 / 60 / 60 / 24) // 把相差的毫秒數轉換為天數
  return days
}

export const checkDate = function (eventDate) {
  const date1 = new Date() // 當天日期
  const date2 = new Date(eventDate) // 展覽
  const days = parseInt((date2 - date1) / 1000 / 60 / 60 / 24) // 把相差的毫秒數轉換為天數(可能會有負數)
  return days
}
