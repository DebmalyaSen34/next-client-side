"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Phone, Mail, Edit2, ChevronRight, ArrowLeft, LogOut } from 'lucide-react';
import Image from 'next/image';
import profileUrls from './profilePictures';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CreativeProfileLoading from './loading';
import Layout from '../components/layout';
import { getUserIdFromCookie } from '../actions';
import { removeAuthCookie } from '../actions';

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
    <Icon className="w-5 h-5 text-red-500 mr-3" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-red-500">{value}</p>
    </div>
  </div>
);

const EditButton = ({ onclick }) => (
  <motion.button
    onClick={onclick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md"
  >
    Edit Profile
  </motion.button>
);

const LogoutButton = ({ onClick }) => (
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

export default function Component({ params }) {

  //TODO: Make feature that user can upload desired profile pic
  //TODO: Ship feature in 1 week

  // Returns a random profile picture URL
  const getRandomProfileUrl = () => {
    const randomProfileUrl = Math.floor(Math.random() * profileUrls.length);
    return profileUrls[randomProfileUrl];
  }

  // Get the user's profile picture from localStorage or fetch a new one if needed
  const getProfileUrl = () => {
    if (typeof window === 'undefined') {
      return null; // Return null or a default value during SRR 
    }
    const storedProfilePic = localStorage.getItem('profilePic');
    const storedTimestamp = localStorage.getItem('profilePicTimestamp');
    const now = new Date().getTime();

    // Get the profile picture from localStorage if it exists and is not older than 1 day
    if (storedProfilePic && storedTimestamp) {
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - storedTimestamp < oneDay) {
        return storedProfilePic;
      }
    }

    // Fetch a new profile picture if localStorage does not exist or is older than 1 day
    const newProfilePic = getRandomProfileUrl();
    localStorage.setItem('profilePic', newProfilePic);
    localStorage.setItem('profilePicTimestamp', now);
    return newProfilePic;
  }

  // State to keep track of the loading state of the profile picture and user Data
  const [profilePic, setProfilePic] = useState(getProfileUrl());
  const [datauser, setUserData] = useState(null);

  React.useEffect(() => {

    const fetchUserData = async () => {
      try {
        const storedUserData = localStorage.getItem('userData')
        if (storedUserData) {
          try {
            setUserData(JSON.parse(storedUserData));
            console.log('User data fetched from cache:', storedUserData);
          } catch (error) {
            console.error('Failed to fetch user data from cache:', error);
          }
        } else {
          const userId = getUserIdFromCookie();
          console.log('User ID:', userId);
          const response = await fetch('/api/user/getUser',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'userId': userId,
              },
            }
          )
          if (response.ok) {
            const data = await response.json();
            setUserData(data.data)
            localStorage.setItem('userData', JSON.stringify(data.data));
          } else {
            toast({
              title: "Error",
              description: "An error occurred while fetching user data.",
              variant: "destructive",
            })
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error)
        toast({
          title: "Error",
          description: "An error occurred while fetching user data.",
          variant: "destructive",
        })
      }
    };

    fetchUserData();

  }, []);


  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await removeAuthCookie();
      if (result) {
        localStorage.removeItem('profilePic');
        localStorage.removeItem('profilePicTimestamp');
        router.push('/login');
      } else {
        console.error('Failed to remove auth cookie');
      }
    } catch (error) {
      console.error('An error occurred while logging out: ', error);
    }
  }

  if (!datauser) {
    return <CreativeProfileLoading />;
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pb-8">
        <main className="max-w-lg mx-auto px-4">
          <ProfilePicture src={profilePic} />
          <InfoSection title="Personal Info">
            <InfoItem icon={User} label="Your name" value={datauser.name} />
          </InfoSection>
          <InfoSection title="Contact Info">
            <InfoItem icon={Phone} label="Phone number" value={datauser.phonenumber} />
            <InfoItem icon={Mail} label="Email" value={datauser.email} />
          </InfoSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* <EditButton onclick={() => router.push(`/profile/${datauser._id}`)} /> */}
            <LogoutButton onClick={handleLogout} />
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}