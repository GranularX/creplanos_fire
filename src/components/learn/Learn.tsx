import React, { useState, useEffect } from 'react';
import { Play, Bookmark, X } from 'lucide-react';

export function Learn() {
  const [showModal, setShowModal] = useState(false);
  
  // Show modal immediately on page load
  useEffect(() => {
    setShowModal(true);
  }, []);

  const videos = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Video Title ${i + 1}`,
    description: `Description for Video Title ${i + 1}. Learn more about this amazing topic!`,
    thumbnail: `https://via.placeholder.com/300x180?text=Thumbnail+${i + 1}`,
    duration: `${Math.floor(Math.random() * 30) + 10}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`,
  }));

  const closeModal = () => {
    setShowModal(false);
    window.location.href = '/';  // Redirect to homepage
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00d4ff] to-[#e500ff] relative">
      {/* Dark overlay for the entire background */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* WhatsApp Join Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={closeModal}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6">
              <div className="bg-gradient-to-r from-[#00d4ff] to-[#e500ff] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" className="w-10 h-10 fill-white">
                  <path d="M87.882,13.669 C47.833,13.669,15.342,46.16,15.342,86.209c0.0016,14.5,3.83,28.728,11.0932,41.2308 L14.7364,162.275l35.9816-11.6724 C62.7116,158.4462,75.1064,162.0292,87.886,162.0308h0.0044c40.0476,0,72.5452-32.496,72.5512-72.5488 C160.4456,46.158,127.9328,13.669,87.882,13.669z M87.8864,148.4384 C76.1944,148.4368,64.7048,144.9132,54.952,138.2476 L52.181,136.5868 L29.1672,143.3244l6.8376-22.6764 L34.0348,117.682 C26.8128,107.6112,22.9344,95.5632,22.9348,83.0148 C22.9348,50.4256,50.2984,23.0608,87.89,23.0608 C121.0932,23.0608,147.85,49.816,147.8556,83.0192 C147.8556,115.612,121.4756,148.4384,87.8864,148.4384z" /> 
                  <path d="M126.7248,104.2384 C125.0772,103.414,115.1,98.4432,113.5912,97.8816 C112.0808,97.318,110.8928,97.038,109.7048,98.686 C108.5168,100.334,104.5644,104.9232,103.5348,106.1092 C102.5056,107.296,101.4768,107.4352,99.8292,106.6128 C98.1812,105.789,91.6116,103.6396,83.828,96.758 C77.8456,91.4824,73.8616,85.0332,72.8316,83.3808 C71.8024,81.73,72.7228,80.7752,73.6044,79.9208 C74.388,79.154,75.32,77.9388,76.1628,76.9092 C77.004,75.8804,77.2836,75.118,77.8472,73.9304 C78.4096,72.74,78.1312,71.7112,77.7088,70.8872 C77.2864,70.0636,73.3324,60.0696,71.8652,56.7744 C70.4364,53.5728,68.9828,54.0344,67.8952,53.9772 C66.8672,53.9232,65.6788,53.9232,64.4908,53.9232 C63.3028,53.9232,61.5116,54.346,59.9996,56.0016 C58.491,57.6568,53.1708,62.6268,53.1708,72.6224 C53.1708,82.616,60.58,92.3284,61.4212,93.5168 C62.264,94.704,73.8144,112.6636,91.5296,120.5664 C109.2448,128.466,109.2448,125.5816,112.2672,125.024 C115.2912,124.4656,123.69,119.9368,125.1588,116.0812 C126.6276,112.2276,126.6276,108.9332,126.2056,108.212 C125.782,107.4896,124.5956,107.0656,122.9464,106.2428" /> 
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Join Our CreplanosHQ Community!</h3>
              <p className="text-center text-gray-600 mb-6">Get instant updates, exclusive content, and connect with other learners.</p>
              
              <a 
                href="https://chat.whatsapp.com/IZTkIq3mgtUK9QZfgwBvrx" 
                target="_blank"
                rel="noopener noreferrer" 
                className="block w-full bg-gradient-to-r from-[#00d4ff] to-[#e500ff] hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg text-center transition-opacity"
              >
                Join Now
              </a>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By joining, you agree to receive messages from our community.
              </p>
            </div>
          </div>
        </div>
      )}

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
