import vegatables from '../assets/vegatables.png';

function About() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-red-500 via-red-300 to-white text-gray-800">
            <div className="flex items-center max-w-4xl p-6 bg-white shadow-lg rounded-md text-gray-800">
                {/* Image Section */}
                <div className="flex-shrink-0 w-1/2 md:w-1/3">
                    <img
                        src={vegatables} // Replace with your image URL
                        alt="Healthy Food"
                        className="w-full h-full object-cover rounded-md shadow-md"
                    />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-2/3 pl-6">
                    <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Nutrifive: Your Personalized Nutrition Companion</h1>
                    <p className="mb-4 text-lg">Fuel your wellness journey with Nutrifive, the user-friendly macronutrient and calorie tracker!</p>
                    <p className="mb-4">
                        In today's world, navigating healthy eating can be overwhelming. Nutrifive simplifies the process, empowering you to make informed dietary choices and feel your best.
                    </p>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">What is Nutrifive?</h2>
                    <p className="mb-4 text-lg">
                        Nutrifive is your all-in-one platform for tracking your food intake and gaining valuable insights into your nutrition. Our user-friendly interface makes it easy to:
                    </p>
                    <ul className="list-disc list-inside mb-4 text-gray-700">
                        <li className="mb-2"><strong>Effortlessly Log Meals:</strong> Ditch the calorie counting hassle! Log food through manual entry, barcode scanning (if available), or choose from our extensive pre-populated database.</li>
                        <li className="mb-2"><strong>Real-time Tracking:</strong> See your daily macronutrient (protein, carbohydrates, fat) and calorie consumption instantly. Stay informed and make adjustments to reach your goals.</li>
                        
                    </ul>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">Join the Nutrifive Movement!</h2>
                    <p className="text-lg">
                        Ready to take charge of your nutrition and unlock your full potential? Sign up for Nutrifive today and experience the difference a personalized approach can make.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
