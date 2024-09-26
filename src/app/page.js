"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Utensils, SmartphoneNfc, ThumbsUp } from "lucide-react";
import Link from "next/link";

const BouncingPlate = () => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -top-16 -right-16 w-32 h-32 bg-orange-200 rounded-full flex items-center justify-center"
  >
    <Utensils className="h-16 w-16 text-red-600" />
  </motion.div>
);

const FloatingClock = () => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute -bottom-8 -left-8 w-24 h-24 bg-red-200 rounded-full flex items-center justify-center"
  >
    <Clock className="h-12 w-12 text-orange-600" />
  </motion.div>
);

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);


  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-red-100">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-red-600 text-white">
        <Link className="flex items-center justify-center" href="#">
          <Utensils className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">Preperly</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-red-800">
                  Skip the Wait, Savor the Moment
                </h1>
                <p className="mx-auto max-w-[700px] text-orange-700 md:text-xl">
                  Order hours in advance and have your meal ready when you arrive. Preperly makes dining out as efficient as it is delicious.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                <Button className="bg-red-600 text-white hover:bg-red-700">Get Started</Button>
                </Link>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-100">Learn More</Button>
              </div>
            </motion.div>
          </div>
          <BouncingPlate />
          <FloatingClock />
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-orange-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-red-800">Why Choose Preperly?</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {[
                { icon: Clock, title: "Save Time", description: "No more waiting at restaurants. Your food is ready when you are." },
                { icon: SmartphoneNfc, title: "Easy to Use", description: "Simple mobile app for browsing menus and placing orders in advance." },
                { icon: ThumbsUp, title: "Quality Assured", description: "Restaurants prepare your meal just before your arrival for the best quality." }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <feature.icon className="h-12 w-12 mb-4 text-orange-500" />
                  <h3 className="text-lg font-bold text-red-700">{feature.title}</h3>
                  <p className="text-sm text-orange-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-red-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-red-800">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                { step: 1, title: "Browse & Order", description: "Select a restaurant and place your order hours in advance." },
                { step: 2, title: "Restaurant Prepares", description: "The restaurant receives your order and prepares it just before your arrival time." },
                { step: 3, title: "Enjoy Your Meal", description: "Arrive at the restaurant, skip the wait, and enjoy your freshly prepared meal." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-red-700">{item.title}</h3>
                  <p className="text-sm text-orange-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-red-600 to-orange-500 text-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Skip the Wait?</h2>
                <p className="mx-auto max-w-[600px] text-red-100 md:text-xl">
                  Join Preperly today and start enjoying your favorite restaurants without the wait.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="flex-1 bg-white text-red-800 placeholder-red-300" placeholder="Enter your email" type="email" />
                  <Button className="bg-orange-500 text-white hover:bg-orange-600" type="submit">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-red-200">
                  By signing up, you agree to our Terms & Conditions.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-red-200 bg-red-50">
        <p className="text-xs text-red-700">© 2023 Preperly. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-red-600" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-red-600" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}