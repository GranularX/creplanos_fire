import { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';

const services = [
  { name: 'creEdit', label: 'creEdit - Video Editing' },
  { name: 'creUI', label: 'creUI - UI Design' },
  { name: 'creContent', label: 'creContent - Content Strategy' },
  { name: 'creAudio', label: 'creAudio - Audio Production' },
  { name: 'cre3D', label: 'cre3D - 3D Modeling' },
  { name: 'creDev', label: 'creDev - Software Development' },
  { name: 'creLaundry', label: 'creLaundry - Laundry Service' },
  { name: 'creRide', label: 'creRide - Ride Services' },
  { name: 'creDelivery', label: 'creDelivery - Package Delivery' },
  { name: 'creCatering', label: 'creCatering - Event Catering' },
  { name: 'creArt', label: 'creArt - Art & Design' },
  { name: 'creTailoring', label: 'creTailoring - Tailoring & Fashion' },
  { name: 'creRepairs', label: 'creRepairs - Repairs & Maintenance' },
  { name: 'creBeauty', label: 'creBeauty - Beauty Services' },
  { name: 'creEvents', label: 'creEvents - Event Planning' },
  { name: 'creGardens', label: 'creGardens - Gardening & Landscaping' },
  { name: 'creHealth', label: 'creHealth - Health & Wellness' },
  { name: 'creTutors', label: 'creTutors - Tutoring Services' },
];

const ServiceBookingForm = () => {
  const [service, setService] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingSaved, setRecordingSaved] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordTimeoutRef = useRef(null);

  useEffect(() => {
    setIsFormValid(service !== '' && audioURL !== null);
  }, [service, audioURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);

    if (!service || !audioBlob) return;

    // Convert Blob to Base64
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(',')[1];

      const payload = {
        service_name: service,
        audio_data: base64Audio,
      };

      try {
        const response = await fetch('/api/service-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log('Service Request Response:', data);
      } catch (error) {
        console.error('Error submitting service request:', error);
      }
    };
  };

  const handleToggleRecording = async () => {
    if (recording) {
      handleStopRecording();
    } else {
      await handleStartRecording();
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setRecordingSaved(false);

      const audioChunks = [];
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setRecordingSaved(true);
      };

      recorder.start();

      // Automatically stop recording after 2 minutes
      recordTimeoutRef.current = setTimeout(() => {
        handleStopRecording();
      }, 120000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      clearTimeout(recordTimeoutRef.current);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Service Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Selection */}
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s.name} value={s.name}>{s.label}</option>
            ))}
          </select>
          
          {/* Voice Input with Sound Recording Icon */}
          <div className="relative flex flex-col items-center">
            <button
              type="button"
              className={`p-3 rounded-full text-white bg-gray-600 hover:bg-gray-700 ${recording ? 'bg-red-500 animate-pulse' : ''}`}
              onClick={handleToggleRecording}
            >
              <Mic size={24} />
            </button>
            {recording && (
              <p className="text-red-500 text-sm font-bold animate-pulse mt-2">Recording...</p>
            )}
            {recordingSaved && (
              <p className="text-green-500 text-sm font-bold mt-2">Recording Saved!</p>
            )}
          </div>
          
          {audioURL && (
            <audio controls className="w-full mt-2">
              <source src={audioURL} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 text-white font-bold rounded-lg ${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Submit Request
          </button>
        </form>
      </div>
      
      {/* Modal */}
      {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <center>
            <h3 className="text-lg font-bold mb-2">Request Submitted</h3>
            <p>Your service request has been successfully submitted. We are currently processing it.</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            </center>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBookingForm;
