import React from 'react';

const PricingPage = () => {
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
            <h2 className="text-white text-xl mx-2">Pricing Plans</h2>
            <span className="text-blue-300 text-lg">✧</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto">
            Access the Gen Z workforce platform with a plan that works for your needs.
            Simple pricing, powerful features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-purple-900/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-600/30 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
            <div className="text-purple-300 text-lg font-medium mb-2">Starter</div>
            <div className="flex items-baseline mb-6">
              <span className="text-white text-4xl font-bold">$20</span>
              <span className="text-purple-300 ml-2">/month</span>
            </div>
            <p className="text-purple-200 mb-6">Perfect for individuals and small projects.</p>
            <ul className="space-y-3 mb-8">
              {['Access to 10 services', '5 tasks per month', 'Basic support', 'Community access'].map((feature, i) => (
                <li key={i} className="flex items-center text-purple-100">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-purple-700/80 to-purple-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/50 transform scale-105 shadow-xl shadow-purple-500/20 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="text-blue-300 text-lg font-medium mb-2">Professional</div>
            <div className="flex items-baseline mb-6">
              <span className="text-white text-4xl font-bold">$50</span>
              <span className="text-purple-300 ml-2">/month</span>
            </div>
            <p className="text-purple-200 mb-6">Great for growing businesses and teams.</p>
            <ul className="space-y-3 mb-8">
              {['Access to 30 services', '20 tasks per month', 'Priority support', 'Community access', 'Advanced analytics', 'Custom integrations'].map((feature, i) => (
                <li key={i} className="flex items-center text-purple-100">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-purple-900/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-600/30 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
            <div className="text-purple-300 text-lg font-medium mb-2">Enterprise</div>
            <div className="flex items-baseline mb-6">
              <span className="text-white text-4xl font-bold">$100</span>
              <span className="text-purple-300 ml-2">/month</span>
            </div>
            <p className="text-purple-200 mb-6">Full-featured option for larger organizations.</p>
            <ul className="space-y-3 mb-8">
              {['Access to all services', 'Unlimited tasks', '24/7 dedicated support', 'Community access', 'Advanced analytics', 'Custom integrations', 'API access', 'Enterprise SLA'].map((feature, i) => (
                <li key={i} className="flex items-center text-purple-100">
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Get Started
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 max-w-3xl mx-auto gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-white">1M+</div>
            <div className="text-purple-300">Active Users</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-white">50K+</div>
            <div className="text-purple-300">Services</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-white">100%</div>
            <div className="text-purple-300">Satisfaction</div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is Creplanos?",
                a: "Creplanos is the largest Gen Z workforce platform powered by cutting-edge technology, connecting talented individuals with various services and opportunities."
              },
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "Is there a free trial?",
                a: "We offer a 7-day free trial for all our plans. No credit card required to get started."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and cryptocurrency payments for maximum flexibility."
              }
            ].map((item, i) => (
              <div key={i} className="bg-purple-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-600/30">
                <h3 className="text-xl font-medium text-white mb-2">{item.q}</h3>
                <p className="text-purple-200">{item.a}</p>
              </div>
            ))}
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

export default PricingPage;
