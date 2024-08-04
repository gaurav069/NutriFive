import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const MarqueeComponent = () => {
  const marqueeRef = useRef(null);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const urls = [
        'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2R8ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D',
        'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
      ];

      const responses = await Promise.all(urls.map(url => fetch(url)));
      const blobs = await Promise.all(responses.map(response => response.blob()));
      const imageUrls = blobs.map(blob => URL.createObjectURL(blob));

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);


  const scrollSpeed = 100; 
  const scrollDirection = 'left'; 

  useEffect(() => {
    const marquee = marqueeRef.current;

    const scroll = () => {
      if (scrollDirection === 'left' || scrollDirection === 'right') {
        marquee.scrollLeft += 1;
      } else if (scrollDirection === 'up' || scrollDirection === 'down') {
        marquee.scrollTop += 1;
      }
    };

    let timer = setInterval(scroll, scrollSpeed);

    return () => {
      clearInterval(timer);
    };
  }, [marqueeRef, scrollDirection, scrollSpeed]);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="text-center leading-loose">
            <h1 className="text-4xl font-bold mb-4 leading-tight">Track Your Macros and Calories with NutriFive</h1>
            <p className="text-lg leading-relaxed mb-4">Easily monitor your daily intake of macronutrients and calories with our user-friendly NutriFive tracker.</p>
            <NavLink to="/signup" className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-full mb-10">Get Started</NavLink>
          </div>
        </div>
      </div>
      <div ref={marqueeRef} className="marquee overflow-hidden mt-10">
        <div className="marquee-content flex">
          {images.map((imageUrl, index) => (
            <div key={index} className="marquee-item flex-none w-full sm:w-1/6 px-1">
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="block w-full h-auto rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeComponent;
