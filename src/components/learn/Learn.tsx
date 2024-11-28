import React from 'react';
import { Play, Bookmark } from 'lucide-react';

export function Learn() {
  const videos = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Video Title ${i + 1}`,
    description: `Description for Video Title ${i + 1}. Learn more about this amazing topic!`,
    thumbnail: `https://via.placeholder.com/300x180?text=Thumbnail+${i + 1}`,
    duration: `${Math.floor(Math.random() * 30) + 10}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00d4ff] to-[#e500ff] relative">
      {/* Dark overlay for the entire background */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-white text-center mb-10 mt-10">Learn with Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative bg-white/10 backdrop-blur-md rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Thumbnail with dark overlay */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>

              {/* Content */}
              <div className="relative p-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {video.title}
                </h3>
                <p className="text-sm text-white/80 mt-2 line-clamp-2">
                  {video.description}
                </p>
              </div>

              {/* Actions */}
              <div className="relative flex items-center justify-between px-4 pb-4">
                <button className="flex items-center text-[#00d4ff] hover:text-[#00a3cc] transition-colors">
                  <Play className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Play</span>
                </button>
                <button className="flex items-center text-white/80 hover:text-white transition-colors">
                  <Bookmark className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Save</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
