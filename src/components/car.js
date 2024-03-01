import React, { useState } from 'react';
import axios from 'axios';
import './car.css'
import  Quote from '../img/q1.png'
import  Car from '../img/cars.png'

function App() {
  const [formData, setFormData] = useState({
    Mobile: '',
    Name: '',
    Gender: 'Male',
  });

  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' or 'error'
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Simple validation
    if (!formData.Mobile || !formData.Name) {
      setPopup({
        show: true,
        message: 'Please fill out all fields.',
        type: 'error',
      });
      return;
    }

    try {
        const response = await axios.post('https://widget-cms.adstudio.cloud/api/lb-finance-campaigns', {
            data: {
            Mobile: formData.Mobile,
            Name: formData.Name,
            Gender: formData.Gender,
            Vehicle: 'Car',
            } 
          });

      setPopup({
        show: true,
        message: 'Form submitted successfully!',
        type: 'success',
      });

      console.log('API Response:', response.data);

      // Optionally, reset the form fields after successful submission
      setFormData({
        Mobile: '',
        Name: '',
        Gender: 'Male',
      });
    } catch (error) {
      setPopup({
        show: true,
        message: 'Error submitting the form. Please try again later.',
        type: 'error',
      });

      console.error('Error while making API call:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const closePopup = () => {
    setPopup({
      show: false,
      message: '',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center">
  {/* Quote Image at the top */}
  <div className="flex justify-center items-center p-9">
    <img src={Quote} alt="Your Image"  />
  </div>

  {/* Form and Content */}
  <div className="flex justify-center items-center">
    <div className=" bg-blue-500 p-8 rounded-lg w-auto opacity-95">
        <h1 className="text-white text-3xl font-bold mb-4 text-center ">වැඩි විස්තර දැනගැනීම සඳහා පහත තොරතුරු ලබා දෙන්න</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-white block">Mobile Number</label>
            <input
              type="tel"
              name="Mobile"
              value={formData.Mobile}
              onChange={handleChange}
              className="w-full bg-white p-2 rounded-md"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label className="text-white block">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full bg-white p-2 rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="text-white block">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="text-white">
                <input
                  type="radio"
                  name="Gender"
                  value="Male"
                  checked={formData.Gender === 'Male'}
                  onChange={handleChange}
                  className="mr-2 cursor-pointer"
                />
                Male
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  name="Gender"
                  value="Female"
                  checked={formData.Gender === 'Female'}
                  onChange={handleChange}
                  className="mr-2 cursor-pointer"
                />
                Female
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={!formData.Mobile || !formData.Name}
              className={`bg-white text-blue-500 px-6 py-2 rounded-full ${(!formData.Mobile || !formData.Name) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:text-white transition duration-300 cursor-pointer'
                }`}
            >
              Submit
            </button>


          </div>
        </form>

        {popup.show && (
  <div
    className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 ${popup.type === 'success' ? 'text-green-500' : 'text-blue-500'
      }`}
  >
    <div className="bg-green-200 p-8 rounded-md flex flex-col items-center">
      <p className="mb-4 text-center">{popup.message}</p>
      <button onClick={closePopup} className="text-blue-500 hover:underline text-center">
        Close
      </button>
    </div>
  </div>
)}

      </div>
    </div>
    <div className="hidden md:block flex justify-center items-center">
    <img src={Car} alt="Your Image" className="max-w-full max-h-full" />
  </div>

    </div>
  );
}

export default App;
