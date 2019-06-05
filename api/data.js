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
  return products
    .filter(product => ids.includes(product.id))
    .map(product => ({
      ...product,
      storeIds: product_x_store.filter(row => row.productId === product.id).map(row => row.storeId),
    }))
}
module.exports.getProducts = getProducts

const getStores = async ids => {
  return stores
    .filter(store => ids.includes(store.id))
    .map(store => ({
      ...store,
      productIds: product_x_store.filter(row => row.storeId === store.id).map(row => row.productId),
    }))
}
module.exports.getStores = getStores
