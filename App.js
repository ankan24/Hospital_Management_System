// import PatientForm from "./MyComponents/PatientForm";
// import PatientSearch from "./MyComponents/PatientSearch";

// import ProductSearch from './MyComponents/ProductSearch';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './MyComponents/Login';
import Dashboard from './MyComponents/Dashboard';
import HospitalInventoryForm from './MyComponents/HospitalInventoryForm';

function App() {
  return (
    <>
    {/* <PatientForm /> */}
    {/* <PatientSearch /> */}
    {/* <ProductSearch /> */}


        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<HospitalInventoryForm />} />
            </Routes>
        </Router>

    </>
  );
}

export default App;
