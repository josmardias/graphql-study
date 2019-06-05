const products = [
  { id: '1001', name: 'Swiming Pool' },
  { id: '1002', name: 'Deodorant' },
  { id: '1003', name: 'Leather wallet' },
]

const stores = [
  { id: '1001', name: 'Victor store' },
  { id: '1002', name: 'Coutinhos' },
  { id: '1003', name: 'Madam Frufru' },
]

const product_x_store = [
  { productId: '1001', storeId: '1001' },
  { productId: '1001', storeId: '1002' },
  { productId: '1002', storeId: '1002' },
  { productId: '1002', storeId: '1003' },
]

const getProducts = async ids => {
  return products.filter(product => ids.includes(product.id))
}
module.exports.getProducts = getProducts

const getStores = async ids => {
  return stores.filter(store => ids.includes(store.id))
}
module.exports.getStores = getStores

const getStoresByProductIds = async ids => {
  return ids.map(productId =>
    product_x_store
      .filter(row => row.productId === productId)
      .map(row => stores.find(store => store.id === row.storeId)),
  )
}
module.exports.getStoresByProductIds = getStoresByProductIds

const getProductsByStoreIds = async ids => {
  return ids.map(storeId =>
    product_x_store
      .filter(row => row.storeId === storeId)
      .map(row => products.find(product => product.id === row.productId)),
  )
}
module.exports.getProductsByStoreIds = getProductsByStoreIds
