import React, { useState } from 'react';

const ShowcasePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'design', name: 'Design' },
    { id: 'development', name: 'Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'content', name: 'Content Creation' },
  ];
  
  const services = [
    {
      id: 1,
      title: 'UI/UX Design',
      category: 'design',
      image: '/api/placeholder/600/400',
      type: 'image',
      description: 'Expert UI/UX design services for web and mobile applications.'
    },
    {
      id: 2,
      title: 'Web Development',
      category: 'development',
      image: '/api/placeholder/600/400',
      type: 'image',
      description: 'Full-stack web development with cutting-edge technologies.'
    },
    {
      id: 3,
      title: 'Social Media Marketing',
      category: 'marketing',
      image: '/api/placeholder/600/400',
      type: 'video',
      description: 'Strategic social media campaigns that drive engagement.'
    },
    {
      id: 4,
      title: 'Content Writing',
      category: 'content',
      image: '/api/placeholder/600/400',
      type: 'image',
      description: 'Professional content writing for blogs, websites, and more.'
    },
    {
      id: 5,
      title: 'Mobile App Development',
      category: 'development',
      image: '/api/placeholder/600/400',
      type: 'video',
      description: 'Native and cross-platform mobile app development.'
    },
    {
      id: 6,
      title: 'Logo Design',
      category: 'design',
      image: '/api/placeholder/600/400',
      type: 'image',
      description: 'Creative logo design that captures your brand essence.'
    },
    {
      id: 7,
      title: 'SEO Optimization',
      category: 'marketing',
      image: '/api/placeholder/600/400',
      type: 'image',
      description: 'Boost your search engine rankings with our SEO services.'
    },
    {
      id: 8,
      title: 'Video Production',
      category: 'content',
      image: '/api/placeholder/600/400',
      type: 'video',
      description: 'High-quality video production for various platforms.'
    },
    {
      id: 9,
      title: 'E-commerce Solutions',
      category: 'development',
      image: '/api/placeholder/600/400',
      type: 'image',
      description: 'Complete e-commerce website development and optimization.'
    }
  ];
  
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      {/* Navigation */}
      {/* <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Creplanos</div>
        <nav className="hidden md:flex items-center space-x-6">
          <button className="text-white hover:text-purple-200">Taskboard</button>
          <button className="text-white hover:text-purple-200">Wallet</button>
          <button className="text-white hover:text-purple-200">Sign In</button>
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Sign Up
          </button>
        </nav>
        <div className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </header> */}

        <br/>
      {/* Main Content */}
      <main className="flex-grow px-6 md:px-12 py-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-2">
            <span className="text-blue-300 text-lg">✧</span>
            <h2 className="text-white text-xl mx-2">Service Showcase</h2>
            <span className="text-blue-300 text-lg">✧</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Gen Z Services</h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our diverse range of services powered by cutting-edge technology and delivered by talented Gen Z professionals.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/70'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredServices.map(service => (
            <div 
              key={service.id} 
              className="bg-purple-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-600/30 group hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="relative">
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {service.type === 'video' ? (
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Video
                    </div>
                  ) : 'Image'}
                </div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-56 object-cover"
                />
                {service.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/80 flex items-center justify-center cursor-pointer transform transition-transform group-hover:scale-110">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-purple-300 text-sm mb-1 capitalize">{service.category}</div>
                <h3 className="text-white text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-purple-200 mb-4">{service.description}</p>
                <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Showcase */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Featured Projects</h2>
          <div className="bg-purple-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-600/30 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src="/api/placeholder/800/450" 
                    alt="Featured Project" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-blue-500/80 flex items-center justify-center cursor-pointer hover:bg-blue-600/80 transition-colors">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-4">Digital Marketing Campaign</h3>
                <p className="text-purple-200 mb-6">
                  A comprehensive digital marketing campaign that increased our client's conversion rate by 200% within just 3 months.
                </p>
                <div className="flex gap-3 mb-6">
                  <span className="bg-purple-800/70 text-purple-200 text-sm px-3 py-1 rounded-full">Marketing</span>
                  <span className="bg-purple-800/70 text-purple-200 text-sm px-3 py-1 rounded-full">Social Media</span>
                  <span className="bg-purple-800/70 text-purple-200 text-sm px-3 py-1 rounded-full">SEO</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full inline-flex items-center self-start">
                  View Case Study
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Alex Chen",
                company: "TechStart Inc.",
                image: "/api/placeholder/100/100",
                quote: "Working with Creplanos has been transformative for our business. Their Gen Z team brings fresh perspectives and innovative solutions that perfectly align with our target market."
              },
              {
                name: "Sarah Johnson",
                company: "ModernBrand",
                image: "/api/placeholder/100/100",
                quote: "The quality of work delivered by Creplanos exceeded our expectations. Their team is responsive, creative, and delivers on time every time."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-purple-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-600/30">
                <div className="flex items-start mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-white font-medium">{testimonial.name}</h3>
                    <p className="text-purple-300 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-purple-200">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-10 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join the largest Gen Z workforce platform and start getting your projects done affordably today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-3 rounded-full font-medium flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
              Use a Service
            </button>
            <button className="bg-purple-900 text-white hover:bg-purple-800 px-8 py-3 rounded-full font-medium flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Learn a Skill
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 md:px-12 border-t border-purple-700/50">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div className="text-white text-xl font-bold mb-4 md:mb-0">Creplanos</div>
          <div className="flex space-x-6 text-purple-300 text-sm">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Support</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShowcasePage;
