import 'dotenv/config';
import App from './app';
import MedicineController from './medicine/medicine.controller';
import validateEnv from './utils/validateEnv';

validateEnv()
 
const app = new App(
  [
    new MedicineController(),
  ]
);

app.listen();
