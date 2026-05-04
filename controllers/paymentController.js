const Transaction = require('../models/Transaction.js')
const jwt = require('jsonwebtoken')
const Auth = require('../models/Auth.js')
//const idempotency = require('express-idempotency')

const payment = async (req, res) => {
    try {
        // const service = idempotency.getSharedIdempotencyService()
        // if(service.isHit(req)){
        //     return
        // }

        const { amount, currency, merchant_id } = req.body;

        try{
            parseInt(amount);
        } catch (err) {
            res.status(400).json({message:"Enter valid amount"})
            return
        }
        try{
            parseInt(merchant_id);
        } catch (err) {
            res.status(400).json({message:"Enter valid merchant id"})
            return
        }

        if(merchant_id.length!=15){
            res.status(400).json({message:"Enter valid merchant id"})
            return
        }

        const previousDay = new Date();
        previousDay.setDate(previousDay.getDate() - 1);

        const check = await Transaction.find({email: req.user.email,
            amount: parseInt(amount),
            currency: currency,
            merchant_id: parseInt(merchant_id),
            createdAt: {$gte: previousDay}
        })

        if (check) {
            res.status(201).json({
                message:`Amount credited to ${merchant_id}`
            })
            return
        }

        const transaction = await Transaction.create({
            email: req.user.email,
            amount: parseInt(amount),
            currency: currency,
            merchant_id: parseInt(merchant_id)
        })


        if (transaction) {
            res.status(201).json({
                message: `Amount credited to ${merchant_id}`
            })
        } else {
            res.status(400).json({ message: 'Invalid transaction data' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = payment;