import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
// import { API } from "./components/api/API";
import {Learn} from "./components/learn/Learn"
import { Layout } from './components/Layout';
// import { ServiceProviderProfile } from './components/profile/ServiceProviderProfile';
// import { UserProfile } from './components/profile/UserProfile';
import { WalletPage } from './components/wallet/WalletPage';
// import ChatInterface from './components/ChatInterface';
import ServiceBookingForm from './components/ServiceBookingForm';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
// import ExternalRedirect from './components/ExternalRedirect';
import Taskboard from "./components/Taskboard";
import PricingPage from './pages/PricingPage';
import NotFound from './components/NotFound';
import ShowcasePage from './pages/ShowcasePage';
import TestimonialSection from './components/Testimonial';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Hero />
              <Features />
              <TestimonialSection/>
              {/* <ChatInterface /> Added ChatInterface component */}
            </>
          } />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound/>} />
          <Route path='showcase' element={<ShowcasePage/>}/>
          <Route path="pricing" element={<PricingPage/>}/>
          {/* <Route path='/j' element={<Taskboard />} /> */}
          <Route element={<PrivateRoute />} >
            <Route path='learn' element={<Learn/>}/>
            {/* <Route path="provider-profile" element={<ServiceProviderProfile />} /> */}
            {/* <Route path="user-profile" element={<UserProfile />} /> */}
            {/* <Route path='api' element={<API/>}/> */}
            <Route path="/wallet" element={<WalletPage />} />
            {/* <Route path='chat' element={<ChatInterface/>}/> */}
            <Route path='book' element={<ServiceBookingForm/>}/>
            {/* <Route path="/taskboard" element={<ExternalRedirect url="https://taskboard.creplanos.com" />} /> */}
            <Route path="/taskboard" element={<Taskboard />} />

          </Route>  
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
