import React from "react";
import { NavLink } from "react-router-dom";

function Sidebyside() {
  return (
    <>
      <div className="mt-20 flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0">
        {/* Left Column - Image */}
        <div className=" flex items-center justify-center card bg-base-300 rounded-2xl overflow-hidden w-full md:w-1/2">
          <img
            className="w-[50%] h-[35%] object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1552250575-e508473b090f?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDE1Mnx8YWJzdHJhY3R8ZW58MHx8fHwxNzE2MjAxNjAyfDA&ixlib=rb-4.0.3&w=1400"
            alt="Nutrition"
          />
        </div>

        {/* Right Column - Text Content */}
        <div className="card bg-base-300 ml-[10%] rounded-lg w-full md:w-1/2 px-4 py-6 flex flex-col items-center md:items-start">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold mb-2">
              Macro Nutrient Tracking
            </h1>
            <p className="text-lg mb-4">
              Monitor intake of proteins, fats, and carbohydrates
            </p>

            <h1 className="text-4xl font-semibold mb-2">Select the Food</h1>
            <p className="text-lg mb-4">Select the food you have eaten</p>

            <h1 className="text-4xl font-semibold mb-2">Calorie Counter</h1>
            <p className="text-lg">Track daily calorie intake</p>
          </div>
        </div>
      </div>

      <div className="bg-red-200 md:h-[28%] w-full md:w-[80%] mx-auto mt-20 rounded-lg flex flex-col md:flex-row items-center justify-between p-10 transform hover:scale-105 hover:bg-sky-950 hover:text-white hover:rotate-1 duration-300">
        {/* Left Side - Text Content */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Start Tracking Your Macros and Calories Today!
          </h1>
          <p className="mt-2 md:mt-4 text-lg">
            Track your macronutrients and calories with NutriFive
          </p>
        </div>

        {/* Right Side - Button */}
        <NavLink
          to="/signup"
          className="bg-red-500 md:bg-red-500 text-white md:text-base rounded-full py-2 px-6 md:py-3 md:px-8 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Get started
        </NavLink>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0">
        {/* Left Column - Text Content */}
        <div className="bg-base-300 rounded-lg w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-semibold mb-4 text-center md:text-left">
            NutriFive Tracker
          </h1>
          <p className="text-lg mb-4 text-center md:text-left">
            Nutrifive: Your personalized nutrition companion. Simplify healthy
            eating, track and calculate your nutritonal values daily.
          </p>
        </div>

        {/* Right Column - Three Rotating Cards */}
        <div className="flex flex-col md:flex-col md:w-1/2 md:space-x-4">
          {/* Card 01 */}
          <div className="bg-red-100 mb-3 rounded-lg overflow-hidden p-6 transform hover:rotate-3 hover:bg-red-300 duration-300 flex-1">
            <h2 className="text-xl font-semibold mb-2">
              Sign Up for NutriFive
            </h2>
            <p className="text-lg mb-4">
              Create an account on NutriFive to start tracking your daily
              macronutrient intake and calories.
            </p>
            <span className="text-4xl font-bold">01</span>
          </div>

          {/* Card 02 */}
          <div className="bg-red-100 mb-3 rounded-lg overflow-hidden p-6 transform hover:rotate-3 hover:bg-red-300 duration-300 flex-1 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold mb-2">Track Your Meals</h2>
            <p className="text-lg mb-4">
              Log your meals and snacks throughout the day to keep track of your
              macronutrient and calorie consumption.
            </p>
            <span className="text-4xl font-bold">02</span>
          </div>

          {/* Card 03 */}
          <div className="bg-red-100 mb-3 rounded-lg overflow-hidden p-6 transform hover:rotate-3 hover:bg-red-300 duration-300 flex-1 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold mb-2">
              Monitor Your Progress
            </h2>
            <p className="text-lg mb-4">
              Review your daily, weekly, and monthly progress to stay on top of
              your nutritional goals and make adjustments as needed.
            </p>
            <span className="text-4xl font-bold">03</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebyside;
