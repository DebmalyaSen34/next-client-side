"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Phone, Mail, Edit2, ChevronRight, ArrowLeft, LogOut } from 'lucide-react';
import Image from 'next/image';
import profileUrls from './profilePictures';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
    </motion.div>
  </header>
);

const ProfilePicture = ({ src }) => (
  <motion.div 
    className="relative w-32 h-32 mx-auto mt-6 mb-4"
    whileHover={{ scale: 1.05 }}
  >
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
    <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>
    {children}
  </motion.section>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center mb-3 last:mb-0">
    <Icon className="w-5 h-5 text-orange-500 mr-3" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-orange-500">{value}</p>
    </div>
  </div>
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

const LogoutButton = ({onClick}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full bg-white border-2 border-red-500 text-red-500 py-3 rounded-lg font-semibold text-lg shadow-md flex items-center justify-center mt-4"
  >
    <LogOut className="w-5 h-5 mr-2" />
    Log Out
  </motion.button>
);

export default function Component() {
  
  //todo: Make feature that user can upload desired profile pic
  //todo: Ship feature in 1 week
  
  const getRandomProfileUrl = () => {
    const randomProfileUrl = Math.floor(Math.random() * profileUrls.length);
    return profileUrls[randomProfileUrl];
  }

  const getProfileUrl = () => {
    const storedProfilePic = localStorage.getItem('profilePic');
    const storedTimestamp = localStorage.getItem('profilePicTimestamp');
    const now = new Date().getTime();

    if(storedProfilePic && storedTimestamp){
      const oneDay = 24 * 60 * 60 * 1000;
      if(now - storedTimestamp < oneDay){
        return storedProfilePic;
      }
    }

    const newProfilePic = getRandomProfileUrl();
    localStorage.setItem('profilePic', newProfilePic);
    localStorage.setItem('profilePicTimestamp', now);
    return newProfilePic;
  }

  const [profilePic, setProfilePic] = useState("");

  React.useEffect(() => {
    setProfilePic(getProfileUrl());
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    try{
      const response = await axios.post('/api/user/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if(response.ok){
        localStorage.removeItem('profilePic');
        localStorage.removeItem('profilePicTimestamp');
        router.push('/');
      }else{
        console.error('Failed to logout');
      }

    }catch(error){
      console.error('An error occurred while loggin out: ', error);
    }
  }

  const userData = {
    name: "JANAKI",
    userName: "janaki",
    phone: "+977 9840103828",
    email: "bibhushansaakha@gmail.com",
    profilePic: profilePic
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-8">
      <Header profilePic={userData.profilePic} />
      <main className="max-w-lg mx-auto px-4">
        <ProfilePicture src={userData.profilePic} />
        <InfoSection title="Personal Info">
          <InfoItem icon={User} label="Your name" value={userData.name} />
          <InfoItem icon={User} label="Username" value={userData.userName} />
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
          <LogoutButton />
        </motion.div>
      </main>
    </div>
  );
}