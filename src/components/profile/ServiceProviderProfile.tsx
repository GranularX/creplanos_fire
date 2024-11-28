import React from 'react';
import { Star, MapPin, Clock, Briefcase, Award, ThumbsUp, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

export function ServiceProviderProfile() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#8E2DE2] via-[#4A00E0] to-[#F77062] pt-20">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="glass-card p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">John Doe</h2>
              <p className="text-gray-300 mb-4 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" /> New York, USA
              </p>
              <div className="flex justify-center items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-bold">4.9</span>
                <span className="text-gray-300">(128 reviews)</span>
              </div>
              <Link to="/wallet">
                <Button variant="primary" className="w-full mb-4">
                  <Wallet className="w-4 h-4 mr-2" />
                  View Wallet
                </Button>
              </Link>
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6">
              <h3 className="text-white font-semibold mb-4">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['Web Design', 'UI/UX', 'Mobile Apps'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-gray-800 text-white text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Briefcase, label: 'Projects', value: '156' },
                { icon: Clock, label: 'Hours', value: '2.4K' },
                { icon: Award, label: 'Experience', value: '5 yrs' },
                { icon: ThumbsUp, label: 'Success Rate', value: '98%' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-card p-4 text-center bg-white/10 backdrop-blur-md rounded-lg shadow-lg"
                >
                  <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-gray-300 text-sm">{label}</div>
                </div>
              ))}
            </div>

            {/* Portfolio */}
            <div className="glass-card p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Recent Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative group overflow-hidden rounded-xl">
                    <img
                      src={`https://picsum.photos/400/300?random=${item}`}
                      alt={`Project ${item}`}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="font-semibold">Project Name</h4>
                        <p className="text-sm text-gray-300">Category</p>
                      </div>
                    </div>
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
