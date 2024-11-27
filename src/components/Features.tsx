import React from 'react';
import {
  // Sparkles,
  // Truck,
  // Brush,
  // BookOpen,
  // Camera,
  // Utensils,
  Video,
  Layout,
  FileText,
  Music,
  Box, // Replaced Cube with Box
  Code,
  Shirt,
  Car,
  Package,
  ClipboardList,
  Paintbrush,
  Scissors,
  Settings,
  Smile,
  Heart,
  HeartPulse,
  Fence,
  // Home,
  // Shield,
  GraduationCap,
} from 'lucide-react';

const features = [
  // {
  //   name: 'Auranys',
  //   description: 'Revolutionary beauty tech solutions',
  //   icon: Sparkles,
  // },
  // {
  //   name: 'Xdely',
  //   description: 'Next-gen logistics technology',
  //   icon: Truck,
  // },
  // {
  //   name: 'SnapClean',
  //   description: 'Smart cleaning solutions',
  //   icon: Brush,
  // },
  // {
  //   name: 'Nearn',
  //   description: 'Interactive e-learning platform',
  //   icon: BookOpen,
  // },
  // {
  //   name: 'Mediava',
  //   description: 'Creative media solutions',
  //   icon: Camera,
  // },
  // {
  //   name: 'Feastflo',
  //   description: 'Innovative food retail tech',
  //   icon: Utensils,
  // },
  {
    name: 'creEdit',
    description: "Transform your raw video, images, or audio into professional masterpieces. Whether it's a quick touch-up or a full-scale edit, we handle it all remotely, so you can focus on what matters.",
    icon: Video,
  },
  {
    name: 'creUI',
    description: "Design beautiful and intuitive user interfaces with our remote UI experts. Whether it's a sleek app design or a dynamic web interface, we bring your ideas to life while you focus on the bigger picture.",
    icon: Layout,
  },
  {
    name: 'creContent',
    description: "Stuck for ideas? We’ve got you covered! Collaborate with our content strategists to spark new ideas and streamline your content creation process—remotely, efficiently, and brilliantly.",
    icon: FileText,
  },
  {
    name: 'creAudio',
    description: "Need a catchy jingle, voiceover, or that perfect sound mix? With our top-notch audio services, you'll get high-quality audio projects delivered remotely and always on time.",
    icon: Music,
  },
  {
    name: 'cre3D',
    description: "Bring your 3D visions to life with our advanced 3D modeling and rendering services. From product designs to architectural visualizations, we create immersive and detailed 3D experiences—remotely and professionally.",
    icon: Box, // Replaced Cube with Box
  },
  {
    name: 'creDev',
    description: "Our expert developers are ready to bring your software projects to life, whether it’s web, mobile, or beyond. Your ideas, professionally coded and delivered on time.",
    icon: Code,
  },
  {
    name: 'creLaundry',
    description: "Enjoy pristine, freshly laundered clothes with creLaundry. Our professional laundry service takes care of everything from washing to folding, providing quality and convenience, so you can focus on what matters most.",
    icon: Shirt,
  },
  {
    name: 'creRide',
    description: "Get where you need to go with creRide. Our professional drivers offer safe, reliable, and comfortable transportation, whether for daily commutes or special events.",
    icon: Car,
  },
  {
    name: 'creDelivery',
    description: "Deliver anything, anytime with creDelivery. Our fast and dependable delivery service ensures your packages arrive securely and on time, whether across town or nationwide.",
    icon: Package,
  },
  {
    name: 'creCatering',
    description: "Indulge in seamless event catering with our gourmet service, tailored to bring exquisite dishes and a memorable dining experience to your table.",
    icon: ClipboardList,
  },
  {
    name: 'creArt',
    description: "Turn your artistic ideas into reality! Whether it's a painting, sculpture, or a digital masterpiece, we offer remote services to help bring your creations to life.",
    icon: Paintbrush,
  },
  {
    name: 'creTailoring',
    description: "Experience custom tailoring with creTailoring. Whether you need alterations or bespoke designs, our expert tailors bring your fashion ideas to life.",
    icon: Scissors,
  },
  {
    name: 'creRepairs',
    description: "When things break, creRepairs is here to help. Our skilled technicians offer repair services for electronics, household items, and more.",
    icon: Settings,
  },
  {
    name: 'creBeauty',
    description: "Enhance your beauty with creBeauty. From skincare consultations to makeup artistry, our experts help you achieve your desired look.",
    icon: Smile,
  },
  {
    name: 'creEvents',
    description: "Make your events unforgettable with creEvents. From planning to decor, we handle every detail to create a seamless, stylish experience.",
    icon: Heart,
  },
  {
    name: 'creGardens',
    description: "Transform your outdoor space with creGardens. Our gardening and landscaping experts design and maintain beautiful gardens.",
    icon: Fence,
  },
  {
    name: 'creHealth',
    description: "Take charge of your health with creHealth. Our healthcare professionals offer personalized wellness consultations and check-ups.",
    icon: HeartPulse,
  },
  // {
  //   name: 'creApartments',
  //   description: "Find your perfect living space with creApartments. We offer high-quality apartments with modern amenities.",
  //   icon: Home,
  // },
  // {
  //   name: 'creSecurity',
  //   description: "Protect your assets with creSecurity. Our professional security services provide you with peace of mind.",
  //   icon: Shield,
  // },
  {
    name: 'creTutors',
    description: "Achieve academic success with creTutors. Our skilled tutors provide personalized, effective lessons for students of all ages.",
    icon: GraduationCap,
  },
];


export function Features() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Render the icon dynamically */}
              {React.createElement(feature.icon, {
                className: 'w-12 h-12 text-[#00d4ff] mb-4',
              })}
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
