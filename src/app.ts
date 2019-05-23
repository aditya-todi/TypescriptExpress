import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import Controller from './interfaces/controller.interface'

class App {
    public app: express.Application

    constructor(controllers) {
        this.app = express()

        this.connectToTheDatabase()
        this.enableCors()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json())
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
          this.app.use('/', controller.router)
        })
    }

    private enableCors() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Authorization, Accept"
            )
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH")
                return res.json({})
            }
            next()
        })        
    }

    private connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true, useFindAndModify: false })
    }    
    
    public listen() {
        this.app.listen(process.env.PORT, () => {
          console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
}

export default App
