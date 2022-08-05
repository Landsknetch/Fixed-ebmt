const mongoose = require('mongoose');
// import { mongoose } from './node_modules/mongoose/index.js'
await mongoose.connect('mongodb+srv://DragoonCrew:9011@cluster0.q7bte.mongodb.net/?retryWrites=true&w=majority');
const Loan = mongoose.model('Loan', {
    lender_address: String,
    borrower_address: String,
    loan_amount: Number,
    payoff_amount: Number,
    loan_duration : Number
    });


    const loan = new Loan({
        lender_address: '0x093434dEc270A41f80Bd088b69a5712c16Ac7edc',
        borrower_address:'0x613e80fdea3C2797c0F922Fb7d5c2742F619Ba6d',
        loan_amount: 10,
        payoff_amount: 2,
        loan_duration : 5
    });
