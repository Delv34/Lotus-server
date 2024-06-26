const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('../config')

const generateAccesToken = (id, roles)=> {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(request, response) {
        try {
            console.log(request.body)
            const {email, password} = request.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return response.json({message: "Пользователь с таким email уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user =  new User({email, password: hashPassword, roles: [userRole.value]})
            await user.save()
            const token = generateAccesToken(user._id, user.roles)
            return response.json({message: "Пользователь был успешно зарегистрирован", token: token})
            
        } catch (error) {
            console.log("Ошибка в catch:",error)
            response.status(400).json({ message: "Registration error"})
        }
    }

    async registration2(request, response) {
        try {
            console.log(request.body)
            const {token, data} = request.body
            console.log(token)
            // name, lastname, surname, birthday, sex, phone, town, door, floor, room
            const usertoken = jwt.verify(token, secret)
            const id = usertoken.id
            const user = await User.findOne({id})
            console.log(user)
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            // const user =  new User({email, password: hashPassword, roles: [userRole.value]})
            // await user.save()
            // return response.json({message: "Пользователь был успешно зарегистрирован"})
            
        } catch (error) {
            console.log("Ошибка в catch:",error)
            response.status(400).json({ message: "Registration error"})
        }
    }
    
    async login(request, response) {
        try {
            const {email, password} = request.body
            const user = await User.findOne({email})
            if (!user) {
                return response.json({message: "Пользователь не найден"})
            }   
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return response.json({message: "Введен неверный пароль"})
            }
            const token = generateAccesToken(user._id, user.roles)
            return response.json({token: token, role: user.roles})
            
        } catch (error) {
            console.log(error)
            response.status(400).json({ message: "Login error"})
        }
    }

    async getUser(request, response) {
        try {
            const {token} = request.body
            const user = jwt.verify(token, secret)
            const id = user.id
            console.log(id)
            const userinfo = await User.findOne({_id: id})
            response.json(userinfo)
        } catch (error) {
            console.log(error)
            response.json({ message: "Не удалось найти пользователя"})
        }
    }

    async getProducts(request, response) {
        try {
            const users = await User.find()
            response.json(users)
        } catch (error) {
            
        }
    }    
}

module.exports = new authController();