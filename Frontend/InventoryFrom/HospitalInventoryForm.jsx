import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './HospitalInventoryForm.css'; 

const HospitalInventoryForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialHospitalName = queryParams.get('hospitalName');
  const initialHospitalID = queryParams.get('hospitalID');

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalID, setHospitalID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const productTypes = [
    'Medicines (tablets, syrups, injections, ointments)',
    'Blood (blood types: A+, O-, etc.)',
    'Injections (vaccines, insulin, pain relief injections)',
    'IV Fluids (saline, dextrose, Ringer\'s lactate)',
    'Syringes (various sizes: 1ml, 5ml, 10ml, etc.)',
    'Needles (hypodermic needles, butterfly needles)',
    'Bandages and Dressings (gauze, adhesive bandages, wound dressings)',
    'Surgical Instruments (scalpels, forceps, scissors)',
    'Gloves (sterile, non-sterile, nitrile, latex)',
    'PPE (masks, face shields, gowns, caps)',
    'Oxygen Cylinders (medical-grade oxygen)',
    'Disinfectants (alcohol wipes, hand sanitizers, surface disinfectants)',
    'Test Kits (COVID-19 test kits, glucose meters)',
    'Specimen Containers (urine containers, blood collection tubes)',
    'Vaccines (measles, hepatitis, tetanus, etc.)',
    'Thermometers (digital, mercury)',
    'Wheelchairs',
    'Stretchers',
    'Catheters (urinary, IV catheters)',
    'IV Drip Sets'
  ];

  useEffect(() => {
    if (initialHospitalName && initialHospitalID) {
      setHospitalName(initialHospitalName);
      setHospitalID(initialHospitalID);
    }
  }, [initialHospitalName, initialHospitalID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inventoryData = {
      hospitalName,
      hospitalID: Number(hospitalID),
      phoneNumber, 
      products: [
        {
          productType,
          productName,
          productQuantity: Number(productQuantity),
          price: Number(price),
          expiryDate,
        },
      ],
    };

    try {
      await axios.post('http://localhost:5000/api/inventory', inventoryData);
      Swal.fire({
        title: 'Success!',
        text: 'Data has been saved to the database.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setHospitalName('');
      setHospitalID('');
      setPhoneNumber(''); 
      setProductType('');
      setProductName('');
      setProductQuantity('');
      setPrice('');
      setExpiryDate('');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error saving the data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Hospital Inventory Form</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        
        <div className="form-group">
          <label>Hospital Name:</label>
          <input
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            placeholder="Enter hospital name"
            disabled
          />
        </div>

        <div className="form-group">
          <label>Hospital ID:</label>
          <input
            type="number"
            value={hospitalID}
            onChange={(e) => setHospitalID(e.target.value)}
            required
            placeholder="Enter hospital ID"
            disabled
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="Enter contact number"
          />
        </div>

        <div className="form-group">
          <label>Product Type:</label>
          <select 
            value={productType} 
            onChange={(e) => setProductType(e.target.value)}
            required
          >
            <option value="">Select product type</option>
            {productTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label>Product Quantity:</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
            placeholder="Enter product quantity"
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter price"
          />
        </div>

        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default HospitalInventoryForm;
