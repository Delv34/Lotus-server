const Category = require('../models/Category')
const Product = require('../models/Product')
class productController {

    async create_product(request, response) {
        try {
            
            
        } catch (error) {
            console.log(error)
            response.status(400).json({ message: "Create product error"})
        }
    }

//     async create_category(request, response) {
//      try {
//         const name = "cakes"
//         const cakes = await Product.find({category: name})
//         const kinds = await Product.find({category: name}).distinct("kind")
//         const fillings = await Product.find({category: name}).distinct("filling")
//         const category = await Category.create({
//             name: name,
//             kind: kinds,
//             filling: fillings,
//             products: cakes
//         })
//         return response.json(category)
//      } catch (error) {
//          console.log(error)
//      }
//  }
    
    async change_product(request, response) {
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

    async delete_product(request, response) {
        try {
            const users = await User.find()
            response.json(users)
        } catch (error) {
            
        }
    }

    async getCategory(request, response) {
           const url = request.params.category
        try {
            const category = await Category.findOne({name: url})
            const products = await Product.find({category: url})
            const data = [category, products]
            return response.json(data)
        } catch (error) {
            
        }
    }

    async getProduct(request,response) {
        const id = request.params.id
        try {
            const product = await Product.findOne({_id: id})
            return response.json(product)

        } catch (error) {
            
        }
    }

}

module.exports = new productController();