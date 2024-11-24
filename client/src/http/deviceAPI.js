import {$authHost, $host} from "./index";


export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/devices', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/devices', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

export const fetchDevice = async (id) => {
    const {data} = await $host.get('api/devices/' + id)
    return data
}

export const createType = async (type) => {
    const {data} = await $authHost.post('api/types', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/types')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brands', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brands')
    return data
}

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/orders', order)
    return data
}

export const fetchOrders = async () => {
    const {data} = await $authHost.get('api/orders')
    return data
}

export const fetchOrderItems = async (orderId) => {
    const {data} = await $authHost.get('api/orders/items/' + orderId)
    return data
}

export const fetchSoldItems = async () => {
    const {data} = await $authHost.get('api/orders/items')
    return data
}