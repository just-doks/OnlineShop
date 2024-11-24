const ApiError = require("../error/ApiError.cjs")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models.cjs')

const generateJwt = (id, email, role) =>
{
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async create (req, res, next) {
        let {email, password, role} = req.body
        if (!email || !password || !role) {
            return next(ApiError.badRequest("Не заполнены обязательные поля"))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        let user = await User.create({email, role, password: hashPassword})
        return res.json(user)
    }

    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.conflict('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.notFound('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const users = await User.findAll() // Любые запросы к БД являются асинхронными
        return res.json(users)
    }

    async update(req, res, next) {
        let {current_email, new_email, new_password} = req.body
        let new_role
        if (req.user.role === 'ADMIN')
        {
            new_role = req.body.role
        }
        let user = await User.findOne({where:{email: current_email}})
        if (user) {
            if (new_password) {
                let hashPassword = await bcrypt.hash(new_password, 5)
                await user.update(
                    {email: new_email, role: new_role, password: hashPassword}
                    )
            }
            else {
                await user.update({email: new_email, role: new_role})
            }
            return res.json(user)
        } else {
            return next(ApiError.notFound("Пользователь по указанному email не найден"))
        }
    }

    async delete(req, res, next) {
        //let {id} = req.query
        let {email} = req.query
        //if (!id) {
        if (!email) {
            return next(ApiError.badRequest("Не указан ID"))
        }
        let result = await User.destroy({where:{email}})
        if (result) {
            return res.json(result)
        } else {
            next(ApiError.notFound("Пользователь по указанному ID не найден"))
        }
    }

}

module.exports = new UserController()