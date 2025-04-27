import React, { useState, useEffect, useRef } from 'react';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      name: "Alexis Chen",
      position: "Chief Marketing Officer",
      company: "FutureTech Solutions",
      avatar: "/api/placeholder/80/80",
      content: "Creplanos transformed our social media presence with creative content that truly connects with our Gen Z audience. Their team understood our brand voice immediately and delivered results that exceeded our expectations.",
      rating: 5
    },
    {
      id: 2,
      name: "Jordan Williams",
      position: "Startup Founder",
      company: "NexGen Apps",
      avatar: "/api/placeholder/80/80",
      content: "As a startup founder working with limited resources, Creplanos has been a game-changer. The quality of work at such affordable rates is unmatched. I've been able to launch my MVP in half the time thanks to their talented pool of Gen Z developers.",
      rating: 5
    },
    {
      id: 3,
      name: "Morgan Taylor",
      position: "Creative Director",
      company: "Visionary Design Co.",
      avatar: "/api/placeholder/80/80",
      content: "The design work we've received through Creplanos has consistently impressed our clients. Fresh perspectives, modern aesthetics, and quick turnaround times - exactly what we needed to stay competitive in today's market.",
      rating: 4
    },
    {
      id: 4,
      name: "Sam Rodriguez",
      position: "Content Manager",
      company: "TrendSetters Media",
      avatar: "/api/placeholder/80/80",
      content: "We've been working with Creplanos for our content needs for over a year now. Their writers understand digital trends and create content that resonates with our audience while maintaining our brand voice perfectly.",
      rating: 5
    },
    {
      id: 5,
      name: "Jamie Thompson",
      position: "E-commerce Director",
      company: "Urban Styles",
      avatar: "/api/placeholder/80/80",
      content: "Our website conversion rate increased by 45% after implementing the UX improvements suggested by Creplanos' team. They truly understand the online shopping behaviors of younger generations.",
      rating: 5
    }
  ];
  
  // Setup auto-sliding functionality
  useEffect(() => {
    // Clear any existing interval when component mounts or dependencies change
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Only set up auto-sliding if not currently hovering
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
          setTimeout(() => {
            setIsAnimating(false);
          }, 200);
        }, 300);
      }, 3000);
    }
    
    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Featured testimonial (current)
  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-2">
            <span className="text-blue-300 text-lg">✧</span>
            <h2 className="text-white text-xl mx-2">Client Stories</h2>
            <span className="text-blue-300 text-lg">✧</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">What People Say About Us</h1>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied clients who have experienced the power of our Gen Z workforce platform.
          </p>
        </div>

        {/* Desktop Layout Featured Testimonial */}
        <div className="hidden md:block max-w-5xl mx-auto mb-16">
          <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl border border-purple-600/30 p-6 md:p-8 relative overflow-hidden">
            <div className="flex items-start gap-10">
              {/* Left Column - Avatar and Info */}
              <div className="w-64 flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-full border-4 border-blue-400/30 mb-4 flex items-center justify-center overflow-hidden bg-purple-700/50 relative">
                  <span className="absolute text-blue-400 text-lg font-medium">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover opacity-0"
                  />
                </div>
                <h3 className="text-white font-semibold text-xl">{currentTestimonial.name}</h3>
                <p className="text-purple-300 text-sm">{currentTestimonial.position}</p>
                <p className="text-blue-300 text-sm mt-1">{currentTestimonial.company}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-purple-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Quote Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-3xl text-purple-100 italic leading-relaxed transition-all duration-500 ease-in-out">
                  "{currentTestimonial.content}"
                </div>
                <div className="flex items-center justify-end mt-6">
                  <svg className="w-6 h-6 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-300 text-sm">Verified Client</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout Featured Testimonial */}
        <div className="md:hidden bg-purple-900/60 backdrop-blur-sm rounded-2xl border border-purple-600/30 p-8 mb-12 relative overflow-hidden">
          {/* Quote icon background */}
          <div className="absolute top-6 right-6 opacity-5">
            <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          
          <div 
            className="flex flex-col items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="mb-6 flex flex-col items-center text-center">
              <img 
                src={currentTestimonial.avatar} 
                alt={currentTestimonial.name} 
                className="w-20 h-20 rounded-full mb-4 border-2 border-blue-400"
              />
              <h3 className="text-white font-semibold text-lg">{currentTestimonial.name}</h3>
              <p className="text-purple-300 text-sm">{currentTestimonial.position}</p>
              <p className="text-blue-300 text-sm">{currentTestimonial.company}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-purple-600'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-xl text-purple-100 italic text-center mb-6">
                "{currentTestimonial.content}"
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-300 text-sm">Verified Client</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation Arrows */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-2">
            <button 
              onClick={prevTestimonial}
              className="bg-purple-800/80 hover:bg-purple-700 text-white p-2 rounded-full z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="bg-purple-800/80 hover:bg-purple-700 text-white p-2 rounded-full z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-4 transition-transform duration-500 ease-in-out pb-6" 
              style={{ 
                transform: `translateX(calc(50% - ${(280 * currentIndex) + 140}px))`,
                padding: "0 20px"
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  onClick={() => goToTestimonial(index)}
                  className={`flex-shrink-0 w-64 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    index === currentIndex 
                    ? 'bg-blue-500/20 border-2 border-blue-400 scale-105 shadow-lg shadow-blue-500/10' 
                    : 'bg-purple-800/40 border border-purple-600/30 hover:bg-purple-800/60'
                  }`}
                >
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-blue-300 text-xs mr-3">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{testimonial.name}</h4>
                      <p className="text-purple-300 text-xs">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-purple-100 text-sm line-clamp-3">
                    "{testimonial.content.substring(0, 100)}..."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-400 w-4' : 'bg-purple-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-white text-xl font-medium">Ready to join our satisfied clients?</h3>
          <div className="mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full inline-flex items-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
