"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Phone, Mail, Edit2, ChevronRight, ArrowLeft, LogOut, BarChart3, DollarSign, Utensils, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import profileUrls from './profilePictures';
import { useRouter } from 'next/navigation';
import CreativeProfileLoading from './loading';
import Layout from '../components/layout';
import { getUserIdFromCookie } from '../actions';
import { removeAuthCookie } from '../actions';
import { useToast } from '@/hooks/use-toast';

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

const FavoriteItem = ({ name, count, rank }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.1 * rank }}
    className="flex items-center p-3 bg-white rounded-lg shadow-sm mb-2"
  >
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${rank === 0 ? "bg-yellow-400" : rank === 1 ? "bg-gray-300" : "bg-amber-600"
        }`}
    >
      <span className="font-bold text-white">{rank + 1}</span>
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">Ordered {count} times</p>
    </div>
    <Utensils className="w-5 h-5 text-red-500" />
  </motion.div>
)

export default function Component({ params }) {

  //TODO: Make feature that user can upload desired profile pic
  //TODO: Ship feature in 1 week

  const { toast } = useToast();

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
  const [favoriteItems, setFavoriteItems] = useState([])
  const [weeklyExpenditure, setWeeklyExpenditure] = useState(0)
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)

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
          const userId = await getUserIdFromCookie();
          console.log('User ID:', userId);
          const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/profile?customerId=${userId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched user data:', data.data);
            setUserData(data.data[0])
            localStorage.setItem('userData', JSON.stringify(data.data[0]));
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchUserData();

  }, []);

  React.useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!datauser) return

      try {
        setIsLoadingOrders(true)

        // Get current date and date from 7 days ago
        const today = new Date()
        const sevenDaysAgo = new Date(today)
        sevenDaysAgo.setDate(today.getDate() - 7)

        // Format dates for Supabase query
        // const todayStr = today.toISOString()
        // const sevenDaysAgoStr = sevenDaysAgo.toISOString()

        // Fetch orders from Supabase
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/orderHistory?customerId=${datauser.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch order history")
        }

        // Process orders to find favorite items and calculate weekly expenditure
        const itemCounts = {}
        let totalSpent = 0

        const data = await response.json()

        const orders = data.data

        console.log('Fetched orders:', orders);

        orders.forEach((order) => {
          // Calculate total spent
          console.log('Order:', order);
          totalSpent = totalSpent + order.totalamount;

          // Count item frequencies
          if (order.items) {
            const itemsArray = Object.values(order.items);
            itemsArray.forEach((item) => {
              if (itemCounts[item.name]) {
                itemCounts[item.name].count += item.quantity;
                itemCounts[item.name].totalSpent += parseFloat(item.price) * item.quantity;
              } else {
                itemCounts[item.name] = {
                  count: item.quantity,
                  totalSpent: parseFloat(item.price) * item.quantity,
                };
              }
            });
          } else {
            console.warn('Order does not contain items:', order);
          }
        })

        // Sort items by frequency and get top 3
        const sortedItems = Object.entries(itemCounts)
          .map(([name, data]) => ({
            name,
            count: data.count,
            totalSpent: data.totalSpent,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3)

        setFavoriteItems(sortedItems)
        setWeeklyExpenditure(totalSpent)
        setIsLoadingOrders(false)
      } catch (error) {
        console.error("Error fetching order history:", error)
        setIsLoadingOrders(false)
      }
    }

    if (datauser) {
      fetchOrderHistory()
    }
  }, [datauser])


  const router = useRouter();

  //TODO: Fix Logout Error
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

  React.useEffect(() => {
    console.log('Updated datauser:', datauser);
  }, [datauser]);

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
          <InfoSection title="Your Favorite Dishes">
            {isLoadingOrders ? (
              <div className="flex justify-center py-4">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-12 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : favoriteItems.length > 0 ? (
              <>
                {favoriteItems.map((item, index) => (
                  <FavoriteItem key={item.name} name={item.name} count={item.count} rank={index} />
                ))}
              </>
            ) : (
              <p className="text-gray-500 text-center py-3">No order history found.</p>
            )}
          </InfoSection>

          <InfoSection title="Weekly Food Expenditure">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="w-10 h-10 text-red-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">This week&apos;s spending</p>
                  <p className="font-bold text-2xl text-red-500">
                    ₹{isLoadingOrders ? "..." : weeklyExpenditure.toFixed(2)}
                  </p>
                </div>
              </div>
              <motion.div
                className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <IndianRupee className="w-8 h-8 text-red-500" />
              </motion.div>
            </div>

            {!isLoadingOrders && favoriteItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100"
              >
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Pro tip:</span> You spent ₹{favoriteItems[0]?.totalSpent.toFixed(2)} on{" "}
                  {favoriteItems[0]?.name} this week!
                </p>
              </motion.div>
            )}
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