const {Brand} = require('../models/models.cjs')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async update(req, res, next) {
        try {
            let {old_name, new_name} = req.body

            if (!old_name || !new_name) {
                return next(ApiError.badRequest("Не заполнены обязательные поля"))
            }

            const brand = await Brand.findOne({where:{name: old_name}})

            if (!brand) {
                return next(ApiError.notFound("Бренд по указанному имени не найден"))
            }

            if (brand) {
                await brand.update({name: new_name})
            }

            return res.json(brand)

        } catch(e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res) {
        const {name} = req.query
        const result = await Brand.destroy({
            where: {
                name: name
            }
        })
    
        return res.json(result)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll() // Любые запросы к БД являются асинхронными
        return res.json(brands)
    }

    async getOne(req, res) {
        const {id} = req.params 
        const brand = await Brand.findOne({where: {id}})
        return res.json(brand)
    }

    async updateByID(req, res, next) {
        try {
            let {id} = req.params
            if (!id) {
                return next(ApiError.badRequest('Не указан ID'))
            }

            let {name} = req.body

            const brand = await Brand.findOne({where:{id}})

            if (brand) {
                await brand.update({name: name})
            }

            return res.json(brand)

        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteByID(req, res, next) {
        let {id} = req.params
        if (!id) {
            return next(ApiError.badRequest('Не указан ID'))
        }

        const result = await Brand.destroy({where: {id}})

        if (!result) {
            return next(ApiError.notFound('Бренд по указанному ID не найден'))
        }
    
        return res.json(result)
    }
}

module.exports = new BrandController()