const Transaction = require("../models/Transaction")


const getHistory = async (req,res) => {
    try {
        const email = req.user.email
        
        const history = await Transaction.find({email: email})

        if (history) {
            res.status(201).json({
                message: "Transaction history fetched",
                history: history
            })
        } else {
            res.status(201).json({ message: 'No transactions' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = getHistory