import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Layout } from './components/Layout';
import { ServiceProviderProfile } from './components/profile/ServiceProviderProfile';
import { UserProfile } from './components/profile/UserProfile';
import { WalletPage } from './components/wallet/WalletPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="provider-profile" element={<ServiceProviderProfile />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="wallet" element={<WalletPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;