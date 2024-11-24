// import dotenv from 'dotenv'
// dotenv.config()
//import sequelize from './db.js'
// import express from 'express'
require('dotenv').config()
const express = require('express')
const cors = require('cors') // Для того, чтобы отправлять запросы с браузера
const fileUpload = require('express-fileupload')
const path = require('path')

const sequelize = require('./db.cjs')
const models = require('./models/models.cjs')
const router = require('./routes/index.cjs')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.cjs')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json()) // Для того, чтобы приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// обработка ошибок, последний middleware
app.use(errorHandler)

const start = async() => {
    try {
        await sequelize.authenticate() // Подключение к БД
        await sequelize.sync() // Функция сверяет БД со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start()