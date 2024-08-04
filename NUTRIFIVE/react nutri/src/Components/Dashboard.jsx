import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Import the CSS file
import logoImage from '../assets/logoImage.png';
import userLogo from '../assets/userLogo.png';


// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [foodData, setFoodData] = useState(null);
  const [intake, setIntake] = useState([]);
  const [date, setDate] = useState('');
  const [profileVisible, setProfileVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: '66980824dfb322849e11beb4',
    username: 'user123',
    fullName: 'John Doe',
    email: 'user@example.com',
    password: '********',
    // photo: {userLogo}
  });
  const [previousIntakes, setPreviousIntakes] = useState({});
  const [totalNutrients, setTotalNutrients] = useState({
    calories: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    proteins: 0,
  });
  const profileRef = useRef(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('lastUpdatedDate');
    if (storedDate && storedDate !== today) {
      setIntake([]);
      localStorage.setItem('intake', JSON.stringify({}));
    }
    localStorage.setItem('lastUpdatedDate', today);
    const storedIntakes = JSON.parse(localStorage.getItem('intake')) || {};
    setPreviousIntakes(storedIntakes);

    // Fetch user info
    axios.get('/api/user-info')
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  // useEffect(() => {
  //   const today = new Date().toISOString().split('T')[0];
  //   localStorage.setItem('intake', JSON.stringify({
  //     ...previousIntakes,
  //     [today]: intake
  //   }));

  //   // Update intake in the backend
  //   // axios.post('/api/intake', { date: today, intake })
  //   //   .catch(error => {
  //   //     console.error('Error updating intake:', error);
  //   //   });
  // }, [intake, previousIntakes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddToIntake = async() => {
    if (foodData) {
      setIntake([...intake, foodData]);
      const [foodid,setFoodId]=useState(foodData._id);
      const [userId,setUserId]=useState(userInfo.userId);
      const [quantity,setQuantity]=useState(1);
      try{
        const res=await fetch(import.meta.env.VITE_API_KEY+"api/v1/food/tracking",{
          method:"POST",
          credentials: 'include',
          body:JSON.stringify({
            userId,
            foodid,
            quantity
          }),
          headers: { "Content-Type": "application/json" },
        });
        if(res.ok){
          const data = await res.json();
          console.log(data);
          // window.location.href='/dashboard';
        }
        else{
          const errorData= await res.json();
          alert(errorData.message || 'Logout not working')
        }
      }
      catch(error){
        console.log('Something went wrong');
        alert('Something went wrong, please try again later');
      }
      setFoodData(null);
    }
  };
  
  useEffect(() => {
    const calculatedNutrients = intake.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        acc.fiber += item.fiber;
        acc.protein += item.protein;
        return acc;
      },
      { calories: 0, carbs: 0, fat: 0, fiber: 0, protein: 0 }
    );
    setTotalNutrients(calculatedNutrients);
  }, [intake]);

  const pieData = {
    labels: ['Calories', 'Carbs', 'Fat', 'Fiber', 'Proteins'],
    datasets: [
      {
        label: 'Nutritional Values',
        data: [
          totalNutrients.calories,
          totalNutrients.carbs,
          totalNutrients.fat,
          totalNutrients.fiber,
          totalNutrients.protein
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const toggleProfile = () => {
    setProfileVisible(!profileVisible);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    axios.put('/api/user-info', userInfo)
      .then(response => {
        alert('Profile updated!');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  // const handlePhotoUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setUserInfo({ ...userInfo, photo: reader.result });
  //       // Update photo in the backend
  //       axios.put('/api/user-info/photo', { photo: reader.result })
  //         .catch(error => {
  //           console.error('Error updating photo:', error);
  //         });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    const selectedDate = e.target.value;
    axios.get(`/api/intake?date=${selectedDate}`)
      .then(response => {
        setIntake(response.data);
      })
      .catch(error => {
        console.error('Error fetching intake for selected date:', error);
      });
  };

  const handleLogout = async() => {
    // Clear user session or token
    try{
      const res=await fetch(import.meta.env.VITE_API_KEY+"api/v1/user/logout",{
        method:"POST",
        credentials: 'include', 
        headers: { "Content-Type": "application/json" },
      });
      if(res.ok){
        const data = await res.json();
        window.location.href='/';
      }
      else{
        const errorData= await res.json();
        alert(errorData.message || 'Logout not working')
      }
    }
    catch(error){
      console.log('Something went wrong');
      alert('Something went wrong, please try again later');
    }
  };

  const setFoodName = (SearchData)=>{
    setFoodData(SearchData);
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Bar */}
      <nav className="bg-red-600 text-white flex justify-between items-center px-6 py-4 shadow-lg animate-slideInDown">
        {/* Team Logo */}
        <div className="flex items-center">
          <img
            src={logoImage} // Replace with your logo URL
            alt="Team Logo"
            className="h-20 w-auto "
          />
        </div>
        <div className="flex space-x-6">
          <a href="/" className="text-lg font-semibold hover:text-red-200 transition-colors duration-300 transform hover:scale-105">Home</a>
          <a href="/about" className="text-lg font-semibold hover:text-red-200 transition-colors duration-300 transform hover:scale-105">About Us</a>
        </div>
        <div className="relative flex items-center space-x-4" ref={profileRef}>
          <button
            onClick={toggleProfile}
            className="relative flex items-center bg-white text-red-600 px-4 py-2 rounded-full overflow-hidden group border border-red-600 animate-buttonHover transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={userLogo}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-white mr-2"
            />
            <span className="relative z-10">Profile</span>
            <span className="absolute inset-0 bg-red-100 opacity-50 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 rounded-full"></span>
          </button>
          <button
            onClick={handleLogout}
            className="relative bg-white text-red-600 px-4 py-2 rounded-full overflow-hidden group border border-red-600 animate-buttonHover transition-transform duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">Logout</span>
            <span className="absolute inset-0 bg-red-100 opacity-50 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 rounded-full"></span>
          </button>
          {/* Profile Dropdown */}
          {profileVisible && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black border border-gray-300 rounded-lg shadow-lg z-10 animate-fadeIn transition-opacity duration-300 opacity-100">
              <div className="p-4">
                <img
                  src={userLogo}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-2 border-gray-300 mx-auto"
                />
                <h3 className="text-lg font-semibold text-center mt-2">{userInfo.username}</h3>
                <p className="text-sm text-center">{userInfo.email}</p>
                <form onSubmit={handleProfileUpdate} className="mt-4">
                  <label className="block text-sm font-medium">Full Name:</label>
                  <input
                    type="text"
                    value={userInfo.fullName}
                    onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  />
                  <label className="block text-sm font-medium mt-4">Password:</label>
                  <input
                    type="password"
                    value={userInfo.password}
                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  />
                  {/* <label className="block text-sm font-medium mt-4">Photo:</label>
                  <input
                    type="file"
                    onChange={handlePhotoUpload}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  /> */}
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded-lg mt-4 hover:bg-red-700 transition-colors duration-300"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <aside className="bg-white w-1/4 p-4 shadow-lg animate-fadeInLeft">
          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          {/* Previous Intakes */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Previous Intakes:</h3>
            <ul>
              {Object.keys(previousIntakes).map((intakeDate) => (
                <li key={intakeDate}>
                  <button
                    onClick={() => setDate(intakeDate)}
                    className="w-full text-left text-red-600 underline hover:text-red-800"
                  >
                    {intakeDate}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Main Section */}
        <main className="bg-gradient-to-b from-red-100 to-white flex-grow p-4 overflow-auto">
          <SearchBar parentCallback={setFoodName} />
          {
            foodData?(
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">{foodData?.name} Nutritional Values</h2>
              <ul>
                <li className="mb-2">Calories: {foodData?.calories}</li>
                <li className="mb-2">Carbs: {foodData?.carbs}</li>
                <li className="mb-2">Fat: {foodData?.fat}</li>
                <li className="mb-2">Fiber: {foodData?.fiber}</li>
                <li className="mb-2">Protein: {foodData?.protein}</li>
              </ul>
            </div>
            ):(
              <div></div>
            )
          }
          <div>
            <button
              onClick={handleAddToIntake}
              className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700 transition-colors duration-300"
            >
              Add to Intake
            </button>
          </div>
          
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Today's Intake</h2>
            <ul>
              {intake.length > 0 ? (
                intake.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item.name} - Calories: {item.calories}, Carbs: {item.carbs}, Fat: {item.fat}, Fiber: {item.fiber}, Protein: {item.protein}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No items added for today.</p>
              )}
            </ul>
          </div>
          {/* Nutritional Values List */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Nutritional Values</h2>
            <ul>
              <li className="mb-2">Calories: {totalNutrients.calories}</li>
              <li className="mb-2">Carbs: {totalNutrients.carbs}</li>
              <li className="mb-2">Fat: {totalNutrients.fat}</li>
              <li className="mb-2">Fiber: {totalNutrients.fiber}</li>
              <li className="mb-2">Protein: {totalNutrients.protein}</li>
            </ul>
          </div>
        </main>
        {/* Right Sidebar */}
        <aside className="bg-white w-1/4 p-4 shadow-lg animate-fadeInRight">
          <h2 className="text-xl font-semibold mb-2">Nutritional Values</h2>
          <Pie data={pieData} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
