const {Order, OrderItem} = require('../models/models.cjs')
const ApiError = require('../error/ApiError.cjs')

class OrderController {
    async create(req, res, next) {
        try {
            let {price, userId, items} = req.body
            if (!price || !userId || !items) {
                return next(ApiError.badRequest("Не заполнены обязательные поля"))
            }

            const order = await Order.create({price, userId})
            
            if (items) {
                items = JSON.parse(items)
                items.forEach(i => 
                    OrderItem.create({
                        orderId: order.id,
                        deviceId: i.deviceId,
                        amount: i.amount
                    }))
            }
            return res.json(order)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        const {id} = req.params

        const order = await Order.findOne({where: {id}})
 
        await OrderItem.destroy({where: {orderId: id}})
        await order.destroy();

        return res.json(order)
    }

    async getOrders(req, res) {
        const orders = await Order.findAll()
        return res.json(orders)
    }

    async getOneOrder(req, res, next) {
        const {id} = req.params
        const order = await Order.findOne({where: {id}})
        if (!order) {
            return next(ApiError.badRequest("Заказа по указанному ID не найдено"))
        }
        return res.json(order)
    }

    async getOrderItems(req, res, next) {
        try {
            let {orderId} = req.params
            const items = await OrderItem.findAll({where: {orderId}})
            if (items) {
                return res.json(items)
            } else {
                return next(ApiError.notFound("Устройств не найдено"))
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }  
    }

    async getItems(req, res) {
        const items = await OrderItem.findAll()
        return res.json(items)
    }
}

module.exports = new OrderController()