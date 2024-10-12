"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Mail, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import Layout from '@/app/components/layout'

const ProfilePicture = ({src}) => (
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
)

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
)

const InfoItem = ({ icon: Icon, label, name, value, onChange, error }) => (
  <div className="flex items-center mb-3 last:mb-0">
    <Icon className="w-5 h-5 text-red-500 mr-3" />
    <div className="flex-grow">
      <Label htmlFor={name} className="text-sm text-gray-500">{label}</Label>
      <Input
        type= {label === 'Phone number' ? 'number' : 'text'}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 text-red-500 font-medium ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  </div>
)

export default function EditProfile() {
  const [profilePic, setProfilePic] = useState(null)
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    mobileNumber: '',
    email: ''
  })
  const [errors, setErrors] = useState({
    fullName: '',
    username: '',
    mobileNumber: '',
    email: ''
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const getProfileUrl = () => {
      const storedProfilePic = localStorage.getItem('profilePic')
      const storedTimestamp = localStorage.getItem('profilePicTimestamp')
      const now = new Date().getTime()

      if (storedProfilePic && storedTimestamp) {
        const oneDay = 24 * 60 * 60 * 1000
        if (now - parseInt(storedTimestamp) < oneDay) {
          return storedProfilePic
        }
      }

      return '/placeholder.svg?height=128&width=128'
    }

    setProfilePic(getProfileUrl())

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/getUser', { withCredentials: true })
        if (response.status === 200) {
          setUserData(response.data)
        } else {
          toast({
            title: "Error",
            description: "An error occurred while fetching user data.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error)
        toast({
          title: "Error",
          description: "An error occurred while fetching user data.",
          variant: "destructive",
        })
      }
    }

    fetchUserData()
  }, [toast])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
    
    // Validate the input
    let error = ''
    switch (name) {
      case 'username':
        if (value.includes(' ')) {
          error = 'Username should not contain spaces'
        } else if (value.length < 3) {
          error = 'Username should be at least 3 characters long'
        }
        break
      case 'mobileNumber':
        if (!/^\d{10}$/.test(value)) {
          error = 'Phone number should be exactly 10 digits'
        }
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address'
        }
        break
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error !== '')) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before submitting.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await axios.put('/api/user/updateUser', userData, { withCredentials: true })
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Profile updated successfully.",
        })
        router.push('/profile')
      }
    } catch (error) {
      console.error('An error occurred while updating user data:', error)
      toast({
        title: "Error",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/user/logout', {}, { withCredentials: true })
      if (response.status === 200) {
        localStorage.removeItem('profilePic')
        localStorage.removeItem('profilePicTimestamp')
        router.push('/login')
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error)
      toast({
        title: "Error",
        description: "An error occurred while logging out.",
        variant: "destructive",
      })
    }
  }

  return (
    <Layout>
    <div className="bg-gray-100 min-h-screen pb-8">
      <main className="max-w-lg mx-auto px-4">
        {profilePic && <ProfilePicture src={profilePic} />}
        <form onSubmit={handleSubmit}>
          <InfoSection title="Personal Info">
            <InfoItem icon={User} label="Your name" name="fullName" value={userData.fullName} onChange={handleInputChange} error={errors.fullName} />
            <InfoItem icon={User} label="Username" name="username" value={userData.username} onChange={handleInputChange} error={errors.username} />
          </InfoSection>
          <InfoSection title="Contact Info">
            <InfoItem icon={Phone} label="Phone number" name="mobileNumber" value={userData.mobileNumber} onChange={handleInputChange} error={errors.mobileNumber} />
            <InfoItem icon={Mail} label="Email" name="email" value={userData.email} onChange={handleInputChange} error={errors.email} />
          </InfoSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
              Save Changes
            </Button>
            <Button type="button" variant="outline" className="w-full border-red-200 text-red-500" onClick={() => router.push('/profile')}>
              Cancel
            </Button>
            <Button type="button" variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </Button>
          </motion.div>
        </form>
      </main>
    </div>
    </Layout>
  )
}