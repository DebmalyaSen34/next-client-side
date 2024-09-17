"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Phone, Mail, Edit2, ChevronRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const Header = ({ profilePic }) => (
  <header className="bg-white shadow-md p-4 flex items-center justify-between">
    <div className="flex items-center">
      <ArrowLeft className="w-6 h-6 text-gray-600 mr-4" />
      <motion.div 
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-2"
      >
        <span className="text-white text-xl font-bold">P</span>
      </motion.div>
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
        PREPERLY
      </h1>
    </div>
    <motion.div 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500"
    >
        <Image
      src={profilePic}
      alt="User Profile"
      width={50}
      height={50}
      className="object-cover"
    />
      {/* <img src={profilePic} alt="User Profile" className="w-full h-full object-cover" /> */}
    </motion.div>
  </header>
);

const ProfilePicture = ({ src }) => (
  <motion.div 
    className="relative w-32 h-32 mx-auto mt-6 mb-4"
    whileHover={{ scale: 1.05 }}
  >
    {/* <img src={src} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" /> */}
    <Image
      src={src}
      alt="Profile"
      width={128}
      height={128}
      className="rounded-full object-cover border-4 border-white shadow-lg"
    />
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-md"
    >
      <Edit2 className="w-4 h-4" />
    </motion.button>
  </motion.div>
);

const InfoSection = ({ title, children }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-6 mb-4"
  >
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </motion.section>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center mb-3 last:mb-0">
    <Icon className="w-5 h-5 text-orange-500 mr-3" />
    <div>
      <p className="text-sm text-orange-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const ToggleSwitch = ({ isOn, onToggle }) => (
  <motion.button
    className={`w-12 h-6 flex items-center rounded-full p-1 ${
      isOn ? 'bg-green-500' : 'bg-gray-300'
    }`}
    onClick={onToggle}
  >
    <motion.div
      className="bg-white w-4 h-4 rounded-full shadow-md"
      layout
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      animate={{ x: isOn ? 24 : 0 }}
    />
  </motion.button>
);

const EditButton = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md"
  >
    Edit Profile
  </motion.button>
);

export default function Component({params}) {
  const [isMember, setIsMember] = useState(true);

  const userData = {
    name: "JANAKI",
    occupation: "Student",
    address: "NITW, Hanamakonda",
    phone: "+977 9840103828",
    email: "bibhushansaakha@gmail.com",
    profilePic: "https://www.svgrepo.com/show/106359/avatar.svg"
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-8">
      <Header profilePic={userData.profilePic} />
      <main className="max-w-lg mx-auto px-4">
        <ProfilePicture src={userData.profilePic} />
        <InfoSection title="Personal Info">
          <InfoItem icon={User} label="Your name" value={userData.name} />
          <InfoItem icon={User} label="Occupation" value={userData.occupation} />
          <InfoItem icon={MapPin} label="Address" value={userData.address} />
          <div className="flex items-center justify-between mt-4">
            <span className="font-medium">Member</span>
            <ToggleSwitch isOn={isMember} onToggle={() => setIsMember(!isMember)} />
          </div>
        </InfoSection>
        <InfoSection title="Contact Info">
          <InfoItem icon={Phone} label="Phone number" value={userData.phone} />
          <InfoItem icon={Mail} label="Email" value={userData.email} />
        </InfoSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EditButton />
        </motion.div>
      </main>
    </div>
  );
}