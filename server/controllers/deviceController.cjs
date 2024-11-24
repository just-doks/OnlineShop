const uuid = require('uuid')
const path = require('path')
const {Device} = require('../models/models.cjs')
const ApiError = require('../error/ApiError.cjs')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId} = req.body
            let {img} = req.files
            if (!name || !price || !brandId || !typeId || !img) {
                return next(ApiError.badRequest("Не заполнены обязательные поля"))
            }
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            return res.json(device)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async change(req, res, next) {
        try {
            let {id} = req.params
            if (!id) {
                return next(ApiError.badRequest('Не указан ID'))
            }
            let {name, price, brandId, typeId} = req.body
            const {img} = req.files || {}
            let fileName
            if (img) {
                fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            const device = await Device.findOne({where:{id}})
            if (!device) {
                return next(ApiError.notFound('Устройство по указанному ID не найдено'))
            }
            let fields = []
            if (name) {
                device.name = name
                fields.push('name')
            }
            if (price) {
                device.price = price
                fields.push('price')
            }
            if (brandId) {
                device.brandId = brandId
                fields.push('brandId')
            }
            if (typeId) {
                device.typeId = typeId
                fields.push('typeId')
            }
            if (img) {
                device.img = fileName
                fields.push('img')
            }

            if (fields) {
                await device.save({fields: fields})
            }
            return res.json(device)
        } catch(e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query // .../device?brandId=0&typeId=1
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: {
                    brandId: brandId
                },
                limit,
                offset
            })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res, next) {
        const {id} = req.params // .../device/id
        const device = await Device.findOne({where: {id}})
        if (device) {
            return res.json(device)
        } else {
            next(ApiError.notFound('Устройство по указанному ID не найдено'))
        }
    }

    async remove(req, res, next) {
        const {id} = req.params
        const device = await Device.findOne({where: {id}})
        if (device) {
            await device.destroy();
            return res.json(device)
        } else {
            next(ApiError.notFound('Устройство по указанному ID не найдено'))
        }
        
    }
}

module.exports = new DeviceController()