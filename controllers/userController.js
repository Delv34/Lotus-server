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
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = request.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return response.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user =  new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return response.json({message: "Пользователь был успешно зарегистрирован"})
            
        } catch (error) {
            console.log(error)
            response.status(400).json({ message: "Registration error"})
        }
    }
    
    async login(request, response) {
        try {
            const {username, password} = request.body
            const user = await User.findOne({username})
            if (!user) {
                return response.status(400).json({message: "Пользователь не найден"})
            }   
            const validPassword = bcrypt.compare(password, user.password)
            console.log(user.password)
            if (!validPassword) {
                return response.status(400).json({message: "Введен неверный пароль"})
            }
            const token = generateAccesToken(user._id, user.roles)
            return response.json({token})
            
        } catch (error) {
            console.log(error)
            response.status(400).json({ message: "Login error"})
        }
    }

    async getUsers(request, response) {
        try {
            const users = await User.find()
            response.json(users)
        } catch (error) {
            
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