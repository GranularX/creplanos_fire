import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Wallet, Clock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

export function UserProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#8E2DE2] via-[#4A00E0] to-[#F77062] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="glass-card p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Sarah Johnson</h2>
              <p className="text-gray-300 flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-400" /> San Francisco, USA
              </p>
              <Link to="/wallet">
                <Button variant="primary" className="w-full mb-4">
                  <Wallet className="w-4 h-4 mr-2" />
                  View Wallet
                </Button>
              </Link>
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5" />
                <span>sarah.j@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>Joined March 2024</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <div className="glass-card p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {[
                  { title: 'Website Redesign', status: 'In Progress', date: '2h ago' },
                  { title: 'Logo Design', status: 'Completed', date: '1d ago' },
                  { title: 'Mobile App UI', status: 'Review', date: '3d ago' },
                ].map((activity) => (
                  <div
                    key={activity.title}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium">{activity.title}</h4>
                        <p className="text-gray-300 text-sm">{activity.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        activity.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : activity.status === 'In Progress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="glass-card p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Settings</h3>
                <Button variant="secondary">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  'Email Notifications',
                  'SMS Notifications',
                  'Two-Factor Authentication',
                  'Privacy Settings',
                ].map((setting) => (
                  <div
                    key={setting}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                  >
                    <span className="text-white">{setting}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
