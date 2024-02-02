import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import User from '../app/models/User'
import configDatabase from '../config/database'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

const models = [User, Product, Category]

class Database {
    constructor () {
        this.init()
        this.mongo()
    }
    init() {
        this.connection = new Sequelize('postgresql://postgres:15f335DgaFCEA5FCFb4E5c2d4efced6F@postgres.railway.internal:5432/railway')
        models.map((model) => model.init(this.connection)).
        map((model) => model.associate && model.associate
        (this.connection.models))
    }

    mongo() {
        mongoose.set('strictQuery', false); 
        this.mongoConnection = mongoose.connect( 
            'mongodb://mongo:hDdEg33F65GH2aedf6AgF2d2bFaB4Cfb@mongodb.railway.internal:27017',
            { 
                useNewUrlParser: true, useUnifiedTopology: true,
            }
        )
    }
}

export default new Database()