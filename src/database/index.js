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
        this.connection = new Sequelize('postgresql://postgres:35iObrEiWQpdvep8ulbu@containers-us-west-64.railway.app:5738/railway')
        models.map((model) => model.init(this.connection)).
        map((model) => model.associate && model.associate
        (this.connection.models))
    }

    mongo() {
        mongoose.set('strictQuery', false); 
        this.mongoConnection = mongoose.connect( 
            'mongodb://mongo:nfSMzJEQcslnGLajK6lm@containers-us-west-135.railway.app:5874',
            { 
                useNewUrlParser: true, useUnifiedTopology: true,
            }
        )
    }
}

export default new Database()