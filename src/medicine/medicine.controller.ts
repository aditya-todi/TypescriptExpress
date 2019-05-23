import * as express from 'express'
import Medicine from './medicine.interface'
import medicineModel from './medicine.model'
 
class MedicineController {
  public path = '/medicine'
  public router = express.Router()
  
  constructor() {
    this.intializeRoutes()
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllMedicine)
    this.router.post(this.path, this.createMedicine)
    this.router.delete(`${this.path}/:id`, this.deleteMedicine)
  }
 
  private getAllMedicine = (request: express.Request, response: express.Response) => {
    medicineModel.find()
      .then(medicines => {
        response.send(medicines)
      })
      .catch(err => {
        response.send({
          message: "cannot get medicines",
          err: err.message
        })
      })
  }
 
  private createMedicine = (request: express.Request, response: express.Response) => {
    const medicine = new medicineModel(request.body)
    console.log(medicine.save)
    medicine.save()
      .then(savedMedicine => {
        console.log(savedMedicine)
        response.send(savedMedicine)
      })
      .catch(error => {
        response.send({
        message: "Error uploading to mongoDB",
        error: error.message
      })
    })
  }

  private deleteMedicine = (request: express.Request, response: express.Response) => {
    const id = request.params.id
    console.log(id)
    medicineModel.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.sendStatus(200)
        } else {
          response.sendStatus(404)
        }
      })
  }
}
 
export default MedicineController
