import * as mongoose from 'mongoose';
import Medicine from './medicine.interface';

const medicineSchema = new mongoose.Schema({
    hsnCode: String,
    name: String,
    price: Number,
    brandName: String,
    stockist: String,
});

const medicineModel = mongoose.model<Medicine & mongoose.Document>('Medicine', medicineSchema);

export default medicineModel;
