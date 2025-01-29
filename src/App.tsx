import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { API } from "./components/api/API";
import {Learn} from "./components/learn/Learn"
import { Layout } from './components/Layout';
import { ServiceProviderProfile } from './components/profile/ServiceProviderProfile';
import { UserProfile } from './components/profile/UserProfile';
import { WalletPage } from './components/wallet/WalletPage';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Hero />
              <Features />
              {/* <ChatInterface /> Added ChatInterface component */}
            </>
          } />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="provider-profile" element={<ServiceProviderProfile />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path='api' element={<API/>}/>
          <Route path='learn' element={<Learn/>}/>
          <Route path="wallet" element={<WalletPage />} />
          <Route path='chat' element={<ChatInterface/>}/>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;