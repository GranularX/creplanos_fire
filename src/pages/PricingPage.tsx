import React, { useState, useEffect } from 'react';

const PricingCalculator = () => {
  const [amount, setAmount] = useState(20);
  const [crebytes, setCrebytes] = useState(20000);
  const [isCustomQuote, setIsCustomQuote] = useState(false);

  useEffect(() => {
    // Calculate crebytes based on amount (1 USD = 1000 crebytes)
    const calculatedCrebytes = amount * 1000;
    setCrebytes(calculatedCrebytes);
    
    // Check if amount is over $100 for custom quote
    setIsCustomQuote(amount > 100);
  }, [amount]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setAmount(value);
    } else {
      setAmount(1);
    }
  };

  const predefinedAmounts = [1, 5, 10, 20, 50, 100];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <br/>

      {/* Main Content */}
      <main className="flex-grow px-6 md:px-12 py-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-2">
            <span className="text-blue-300 text-lg">✧</span>
            <h2 className="text-white text-xl mx-2">Crebytes</h2>
            <span className="text-blue-300 text-lg">✧</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Power Your Projects</h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto">
            Crebytes are the currency of our Gen Z workforce platform. Purchase the amount you need
            for your projects and use them to access our comprehensive suite of services.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto bg-purple-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-purple-600/30 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side - Calculator */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-6">Calculate Your Crebytes</h2>

              {/* Predefined Amounts */}
              <div className="mb-8">
                <label className="block text-purple-200 mb-3">Popular Amounts</label>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((value) => (
                    <button
                      key={value}
                      onClick={() => setAmount(value)}
                      className={`py-2 px-4 rounded-lg transition-all duration-200 ${
                        amount === value
                          ? 'bg-blue-500 text-white'
                          : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700'
                      }`}
                    >
                      ${value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div className="mb-8">
                <label htmlFor="customAmount" className="block text-purple-200 mb-3">
                  Custom Amount (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-white text-lg">$</span>
                  </div>
                  <input
                    type="number"
                    id="customAmount"
                    min="1"
                    value={amount}
                    onChange={handleAmountChange}
                    className="block w-full pl-10 pr-4 py-3 bg-purple-800/40 border border-purple-600/50 rounded-lg text-white text-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="mb-8">
                <label htmlFor="amountSlider" className="block text-purple-200 mb-3">
                  Adjust Amount
                </label>
                <input
                  type="range"
                  id="amountSlider"
                  min="1"
                  max="100"
                  step="1"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full h-2 bg-purple-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-purple-300 text-sm mt-2">
                  <span>$1</span>
                  <span>$25</span>
                  <span>$50</span>
                  <span>$75</span>
                  <span>$100</span>
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="flex flex-col justify-center bg-purple-800/40 rounded-xl p-6 border border-purple-600/30">
              <div className="text-center">
                <div className="mb-3">
                  <span className="text-purple-200">You'll receive</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2 flex items-center justify-center">
                  <svg className="w-10 h-10 mr-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-6h2v4h-2v-4zm0-8h2v6h-2V6z"/>
                  </svg>
                  {crebytes.toLocaleString()}
                </div>
                <div className="text-xl text-blue-300 mb-6">Crebytes</div>
                <div className="text-purple-200 mb-8">
                  {isCustomQuote ? (
                    <p className="text-yellow-300">
                      For purchases over $100, please contact our sales team for a custom quote and
                      volume discounts.
                    </p>
                  ) : (
                    <p>1 USD = 1,000 Crebytes</p>
                  )}
                </div>

                {isCustomQuote ? (
                  <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Contact Sales Team
                  </button>
                ) : (
                  <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Purchase Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Instructions Section - ADDED */}
        <div className="max-w-4xl mx-auto bg-purple-900/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-purple-600/30 mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Payment Instructions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bank Details */}
            <div className="bg-purple-800/40 rounded-xl p-6 border border-purple-600/30">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-medium text-blue-300">Bank Transfer Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-900/60 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-200">Bank Name:</span>
                    <span className="text-white font-medium">Wema Bank</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-purple-200">Account Name:</span>
                    <span className="text-white font-medium">Emmanuel Jason Charles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Account Number:</span>
                    <span className="text-white font-medium">0408137366</span>
                  </div>
                </div>
                
                <div className="text-purple-200 text-sm">
                  <p>Please include your name and order reference in the transfer description to help us identify your payment.</p>
                </div>
              </div>
            </div>
            
            {/* WhatsApp Verification */}
            <div className="bg-purple-800/40 rounded-xl p-6 border border-purple-600/30">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-green-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
                </svg>
                <h3 className="text-xl font-medium text-green-400">Payment Verification</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-900/60 rounded-lg p-4">
                  <p className="text-purple-200 mb-3">After making payment, please send proof of payment to:</p>
                  <div className="flex items-center justify-center space-x-2 bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"/>
                    </svg>
                    <span className="text-white font-medium text-lg">+2349037450565</span>
                  </div>
                </div>
                
                <div className="text-purple-200 text-sm">
                  <p>Please include a screenshot of your payment receipt along with your name and email address. Your Crebytes will be credited to your account immediately after verification.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-900/30 rounded-lg p-4 border border-blue-600/30">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-purple-200 text-sm">
                For security reasons, we recommend using your registered email or username as the payment reference. This helps us quickly identify and process your transaction. If you experience any issues with your payment, please contact our support team immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits/Features Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-10">What Can You Do With Crebytes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                ),
                title: "Access Gen Z Talent",
                description: "Connect with skilled Gen Z professionals across various domains to get your work done efficiently."
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                ),
                title: "Use Various Services",
                description: "Choose from over 50,000 services ranging from design and development to marketing and content creation."
              },
              {
                icon: (
                  <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Learn New Skills",
                description: "Invest in your future by using Crebytes to access courses and workshops that teach cutting-edge skills."
              },
            ].map((item, i) => (
              <div key={i} className="bg-purple-900/60 backdrop-blur-sm rounded-xl p-6 border border-purple-600/30 hover:transform hover:translateY-[-4px] transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-purple-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What are Crebytes?",
                a: "Crebytes are the digital currency used on the Creplanos platform. They allow you to access our Gen Z workforce services, hire talented professionals, and use our platform features."
              },
              {
                q: "Do Crebytes expire?",
                a: "No, once purchased, your Crebytes never expire. You can use them whenever you need services on our platform."
              },
              {
                q: "How do I make a payment?",
                a: "You can make a direct bank transfer to our Wema Bank account and send the proof of payment via WhatsApp for quick verification. Your Crebytes will be credited immediately after confirmation."
              },
              {
                q: "Are there discounts for bulk purchases?",
                a: "Yes, for purchases over $100, please contact our sales team to discuss volume discounts and custom packages tailored to your needs."
              },
              {
                q: "How long does payment verification take?",
                a: "Payment verification typically takes 5-15 minutes during business hours. Once your payment is verified, your Crebytes will be instantly credited to your account."
              }
            ].map((item, i) => (
              <div key={i} className="bg-purple-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-600/30">
                <h3 className="text-xl font-medium text-white mb-2">{item.q}</h3>
                <p className="text-purple-200">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Enterprise Solution?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            For large organizations and special requirements, our team can create a tailored 
            package that meets your specific needs.
          </p>
          <button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-3 rounded-full font-medium inline-flex items-center shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Schedule a Consultation
          </button>
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

export default PricingCalculator;
