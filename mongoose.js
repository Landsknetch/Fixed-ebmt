// var mongoose = require('mongoose');
import { mongoose } from './node_modules/mongoose/index.js'
await mongoose.connect('mongodb+srv://DragoonCrew:9011@cluster0.q7bte.mongodb.net/?retryWrites=true&w=majority');
export default mongoose;