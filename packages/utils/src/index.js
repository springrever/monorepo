export const formatPrice = (price) => {
  return '¥' + price.toFixed(2)
}

export const getStatusText = (status) => {
  const map = { 1: '待付款', 2: '已发货', 3: '已完成' }
  return map[status] || '未知'
}
