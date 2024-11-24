const {Type} = require('../models/models.cjs')
const ApiError = require('../error/ApiError.cjs')

class TypeController {
    async create(req, res, next) {
        const {name} = req.body
        if (!name) {
            return next(ApiError.badRequest("Не указано имя"))
        }
        const type = await Type.create({name})
        return res.json(type)
    }

    async update(req, res, next) {
        try {
            let {old_name, new_name} = req.body

            if (!old_name || !new_name) {
                return next(ApiError.badRequest("Не заполнены обязательные поля"))
            }

            const type = await Type.findOne({where:{name: old_name}})

            if (!type) {
                return next(ApiError.notFound("Тип по указанному имени не найден"))
            }

            if (type) {
                await type.update({name: new_name})
            }

            return res.json(type)

        } catch(e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const {name} = req.query
        const result = await Type.destroy({
            where: {
                name: name
            }
        })

        if (!result) {
            return next(ApiError.notFound("Тип по указанному имени не найден"))
        }
    
        return res.json(result)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        if (!id) {
            return next(ApiError.badRequest('Не указан ID'))
        }
        const type = await Type.findOne({where: {id}})
        if (!type) {
            return next(ApiError.badRequest('Тип по указанному ID не найден'))
        }
        return res.json(type)
    }

    async updateByID(req, res, next) {
        try {
            let {id} = req.params
            if (!id) {
                return next(ApiError.badRequest('Не указан ID'))
            }

            let {name} = req.body

            const type = await Type.findOne({where:{id}})

            if (type) {
                await type.update({name: name})
            }

            return res.json(type)

        } catch(e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteByID(req, res, next) {
        let {id} = req.params
        if (!id) {
            return next(ApiError.badRequest('Не указан ID'))
        }

        const result = await Type.destroy({where: {id}})

        if (!result) {
            return next(ApiError.notFound('Тип по указанному ID не найден'))
        }
    
        return res.json(result)
    }
}

module.exports = new TypeController()