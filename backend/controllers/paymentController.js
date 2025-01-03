const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const initiatePayment = async (req, res) => {
    const { amount } = req.body;
    const { id } = req.params;
    const tranId = uuidv4(); // Generate unique transaction ID
    //console.log(id)

    // Prepare request body
    const requestBody = {
        store_id: "aamarpaytest",
        tran_id: tranId,
        success_url: `http://localhost:8000/pay/confirm-payment/${id}`,
        fail_url: "http://localhost:8000/pay/failed-payment",
        cancel_url: "http://localhost:8000/pay/failed-payment",
        amount: amount,
        currency: "BDT",
        signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
        desc: "Merchant Registration Payment",
        cus_name: "Unayes",
        cus_email: "unayeskhan.0808@gmail.com",
        cus_add1: "House B-158 Road 22",
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: "+8801704",
        type: "json"
    };

    try {
        // Send POST request to Aamarpay sandbox API
        const response = await axios.post('https://sandbox.aamarpay.com/jsonpost.php', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Return Aamarpay's response
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to initiate payment", details: error.message });
    }
};

const confirm  = async (req, res) => {
    const { id } = req.params;
    console.log("coming...",id)
    try {
        // Update isPaid field in the Appointment model
        // const updatedAppointment = await Appointment.findOneAndUpdate(
        //     { _id : id }, // Match by transaction ID
        //     { isPaid: true }, // Update to mark as paid
        //     { new: true } // Return the updated document
        // );

        // if (!updatedAppointment) {
        //     return res.status(404).send("Appointment not found for the given transaction ID");
        // }

        // console.log(updatedAppointment)

        // Redirect to the profile page
        res.redirect('http://localhost:5173/profile');
    } catch (error) {
        res.status(500).json({ error: "Failed to update payment status", details: error.message });
    }
};

const failed = async (req,res) =>{
    // Redirect to the profile page
    res.redirect('http://localhost:5173/profile');
}



module.exports = {
    initiatePayment, confirm, failed
};