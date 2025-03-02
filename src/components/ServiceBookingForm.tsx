import React, { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";

const services = [
  { name: "creEdit", label: "creEdit - Video Editing" },
  { name: "creUI", label: "creUI - UI Design" },
  {name: "creGraphics", label:"creGraphics -  Graphics Design"},
  { name: "creContent", label: "creContent - Content Strategy" },
  { name: "creAudio", label: "creAudio - Audio Production" },
  { name: "cre3D", label: "cre3D - 3D Modeling" },
  { name: "creDev", label: "creDev - Software Development" },
  { name: "creLaundry", label: "creLaundry - Laundry Service" },
  { name: "creRide", label: "creRide - Ride Services" },
  { name: "creDelivery", label: "creDelivery - Package Delivery" },
  { name: "creCatering", label: "creCatering - Event Catering" },
  { name: "creArt", label: "creArt - Art & Design" },
  { name: "creTailoring", label: "creTailoring - Tailoring & Fashion" },
  { name: "creRepairs", label: "creRepairs - Repairs & Maintenance" },
  { name: "creBeauty", label: "creBeauty - Beauty Services" },
  { name: "creEvents", label: "creEvents - Event Planning" },
  { name: "creGardens", label: "creGardens - Gardening & Landscaping" },
  { name: "creHealth", label: "creHealth - Health & Wellness" },
  { name: "creTutors", label: "creTutors - Tutoring Services" },
];

const ServiceBookingForm = () => {
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingSaved, setRecordingSaved] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    // Text must be at least 10 words OR audio must be recorded, but not both.
    const textWordCount = description.trim().split(/\s+/).length;
    const isTextValid = description.trim() !== "" && textWordCount >= 10;
    const isAudioValid = audioBlob !== null;

    setIsFormValid(service !== "" && ((isTextValid && !isAudioValid) || (!isTextValid && isAudioValid)));
  }, [service, description, audioBlob]);

  const convertAudioToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Audio = reader.result.split(",")[1]; // Get only Base64 data
        resolve(base64Audio);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);

    if (!service || (!description.trim() && !audioBlob)) {
      console.error("Invalid form submission");
      return;
    }

    let base64Audio = null;
    if (audioBlob) {
      base64Audio = await convertAudioToBase64(audioBlob);
    }

    const payload = {
      service_name: service,
      description: description.trim(),
      audio_data: base64Audio || null,
    };

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Service Request Response:", data);
    } catch (error) {
      console.error("Error submitting service request:", error);
    }
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
      setDescription(""); // Clear text input when recording starts

      audioChunksRef.current = []; // Reset previous audio chunks

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
        setRecordingSaved(true);
      };

      recorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
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

          {/* Description Input - Enabled only when service is selected */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Describe what you need... (Min. 10 words)"
            disabled={!service || audioBlob !== null} // Disable if audio exists
          />

          {/* Voice Input with Sound Recording Icon */}
          <div className="relative flex flex-col items-center">
            <button
              type="button"
              className={`p-3 rounded-full text-white bg-gray-600 hover:bg-gray-700 ${
                recording ? "bg-red-500 animate-pulse" : ""
              }`}
              onClick={handleToggleRecording}
              disabled={!service || description.trim().length > 0} // Disable if text exists
            >
              <Mic size={24} />
            </button>
            {recording && <p className="text-red-500 text-sm font-bold animate-pulse mt-2">Recording...</p>}
            {recordingSaved && <p className="text-green-500 text-sm font-bold mt-2">Recording Saved!</p>}
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
            className={`w-full p-3 text-white font-bold rounded-lg ${
              isFormValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceBookingForm;
