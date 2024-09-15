const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


const uri = "mongodb+srv://demouser:demo123@cluster0.ap4zayq.mongodb.net/company?retryWrites=true&w=majority";
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));


app.use(cors());
app.use(express.json());


const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    hospitalID: { type: Number, required: true, unique: true },
    hospitalPassword: String,
    phoneNumber: String,
    totalBeds: {
        totalEmergencyBeds: Number,
        totalGeneralBeds: Number,
        totalMaternityBeds: Number,
        totalPediatricsBeds: Number,
        totalSurgeryBeds: Number,
        totalOrthopaedicsBeds: Number,
        totalICUBeds: Number,
        totalAllBeds: Number,
    },
    inventory: [
        {
            productType: { type: String, required: true },
            productName: { type: String, required: true },
            productQuantity: { type: Number, required: true },
            price: { type: Number, required: true },
            expiryDate: { type: Date, required: true },
        },
    ],
});


const Hospital = mongoose.model("Hospital", hospitalSchema);


app.post("/api/hospitalLogin", async (req, res) => {
    const { hospitalID, password } = req.body;

    try {
        const hospital = await Hospital.findOne({ hospitalID });

        if (!hospital) {
            return res.status(404).json({ success: false, message: "Hospital not found" });
        }

        if (hospital.hospitalPassword === password) {
            return res.status(200).json({ success: true, hospitalName: hospital.hospitalName });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in" });
    }
});


const inventorySchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    hospitalID: { type: Number, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    products: [
        {
            productType: { type: String, required: true },
            productName: { type: String, required: true },
            productQuantity: { type: Number, required: true },
            price: { type: Number, required: true },
            expiryDate: { type: Date, required: true },
        },
    ],
});

// Mongoose Model
const Inventory = mongoose.model("Inventory", inventorySchema);


app.post("/api/inventory", async (req, res) => {
    const { hospitalID, products } = req.body;

    try {
        let inventory = await Inventory.findOne({ hospitalID });

        if (inventory) {
            inventory.products.push(...products);
            await inventory.save();
            res.status(200).json(inventory);
        } else {
            inventory = new Inventory(req.body);
            await inventory.save();
            res.status(201).json(inventory);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get("/api/inventory/:hospitalID", async (req, res) => {
    const { hospitalID } = req.params;

    try {
        const inventory = await Inventory.findOne({ hospitalID });
        if (!inventory) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.status(200).json(inventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get("/api/searchProduct", async (req, res) => {
    const { productName } = req.query;

    try {
        const hospitals = await Inventory.find({
            "products.productName": { $regex: new RegExp(productName, "i") },
        });

        if (!hospitals.length) {
            return res.status(404).json({ message: "No hospitals found with this product" });
        }

        const results = hospitals.flatMap((hospital) =>
            hospital.products
                .filter((product) => product.productName.toLowerCase().includes(productName.toLowerCase()))
                .map((product) => ({
                    hospitalName: hospital.hospitalName,
                    productName: product.productName,
                    productType: product.productType,
                    productQuantity: product.productQuantity,
                    phoneNumber: hospital.phoneNumber,
                }))
        );

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
