"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  X,
  ShoppingCart,
  Loader2,
  ChefHat,
  Coffee,
  Pizza,
  Star,
  Timer,
  Clock,
  MapPin
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import Header from "@/app/components/restaurantPage/Header";
import RestaurantImage from "@/app/components/restaurantPage/RestaurantImage";
import RestaurantInfo from "@/app/components/restaurantPage/RestaurantInfo";
import MenuItem from "@/app/components/restaurantPage/MenuItem";
import Facilities from "@/app/components/restaurantPage/Facilities";
import QuickActions from "@/app/components/restaurantPage/QuickActions";
import Description from "@/app/components/restaurantPage/Description";
import PhotoSlider from "@/app/components/restaurantPage/PhotoSlider";
import Link from "next/link";

const SliderLoader = () => (
  <Card className="w-full h-48 bg-gradient-to-r from-rose-100 to-teal-50 overflow-hidden relative border-none rounded-none shadow-sm">
    {/* Background shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>

    <div className="absolute inset-0 flex items-center justify-center">
      {/* Main animated plate - smaller on mobile, larger on desktop */}
      <div className="relative">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white shadow-md flex items-center justify-center relative overflow-hidden">
          {/* Inner plate ring - responsive sizing */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-slate-100 absolute"></div>

          {/* Rotating food icons - adjusted positioning for responsiveness */}
          <div className="absolute animate-spin-slow">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24">
              <Pizza className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 absolute top-0 left-6 sm:left-9" />
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-brown-600 absolute bottom-0 left-6 sm:left-9" />
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-0 top-6 sm:top-9" />
              <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 absolute right-0 top-6 sm:top-9" />
            </div>
          </div>
        </div>

        {/* Steam animation - adjusted for mobile */}
        <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-1.5">
          <div className="hidden sm:block w-1 h-6 bg-white rounded-full animate-steam opacity-60 delay-100"></div>
          <div className="w-1 h-6 sm:h-8 bg-white rounded-full animate-steam opacity-75 delay-300"></div>
          <div className="w-1 h-5 sm:h-7 bg-white rounded-full animate-steam opacity-60 delay-500"></div>
          <div className="hidden sm:block w-1 h-5 bg-white rounded-full animate-steam opacity-80 delay-700"></div>
        </div>
      </div>
    </div>

    {/* Restaurant info skeletons - more responsive spacing and sizes */}
    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-col gap-2 sm:gap-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 sm:h-5 w-28 sm:w-40 rounded-md" />
        <div className="flex gap-1 items-center">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-pulse" />
          <Skeleton className="h-3 sm:h-4 w-8 sm:w-10 rounded-md" />
        </div>
      </div>

      <div className="flex gap-2 sm:gap-3">
        <Badge variant="outline" className="bg-white/50 flex items-center gap-1 h-5 sm:h-6 px-2 text-xs sm:text-sm">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
          <Skeleton className="h-2.5 sm:h-3 w-8 sm:w-10 rounded-md" />
        </Badge>

        <Badge variant="outline" className="bg-white/50 flex items-center gap-1 h-5 sm:h-6 px-2 text-xs sm:text-sm">
          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
          <Skeleton className="h-2.5 sm:h-3 w-10 sm:w-14 rounded-md" />
        </Badge>
      </div>
    </div>
  </Card>
);

const MenuItemLoader = () => (
  <div className="flex items-start gap-3 p-4 border-b border-gray-100">
    {/* Dish image skeleton with food animation */}
    <div className="relative min-w-[80px] w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>

      {/* Animated food icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center animate-pulse">
            <Utensils className="w-5 h-5 text-amber-400" />
          </div>
          {/* Mini steam */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-0.5">
            <div className="w-0.5 h-3 bg-white rounded-full animate-steam opacity-60 delay-100"></div>
            <div className="w-0.5 h-4 bg-white rounded-full animate-steam opacity-70 delay-300"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Content section */}
    <div className="flex-1 space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-4 w-12 rounded-md" />
      </div>
      <Skeleton className="h-3 w-full max-w-[180px] rounded-md" />
      <Skeleton className="h-3 w-full max-w-[220px] rounded-md" />

      {/* Add to cart button skeleton */}
      <div className="flex justify-end mt-2">
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

const MenuItemsLoader = () => (
  <div className="p-4 bg-white shadow-md mt-4 rounded-md">
    <Skeleton className="h-6 w-24 mb-4 rounded-md" />
    {[1, 2, 3].map((item) => (
      <MenuItemLoader key={item} />
    ))}
  </div>
);

const Menu = ({ items, cart, onAdd, onRemove, isLoading }) => {
  if (isLoading) {
    return <MenuItemsLoader />;
  }
  return (
    <div className="p-4">
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          quantity={cart[item.name]?.quantity || 0}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

const ShowMenuButton = ({ onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="bg-red-500 text-white py-4 px-6 rounded-full font-semibold text-lg shadow-lg flex items-center justify-center w-full mb-2"
    onClick={onClick}
  >
    <Utensils className="w-5 h-5 mr-2" />
    Show Menu
  </motion.button>
);

const CheckoutButton = ({ totalItems, totalPrice }) => (
  <Link href="/cart">
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="bg-green-500 text-white py-4 px-6 rounded-full font-semibold text-lg shadow-lg flex items-center justify-center w-full"
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      Checkout ({totalItems}) - ₹{totalPrice}
    </motion.button>
  </Link>
);

export default function Component({ params }) {
  const { cart, addCart, removeCart, clearCart, getTotalItems, getTotalPrice } =
    useCart();

  const [menuForItems, setMenuForItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [restaurantData, setRestaurantData] = useState({});
  const [images, setImages] = useState({ imageurls: [], loaded: false });

  const [isLoading, setIsLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);

  console.log(params.restaurantId);

  useEffect(() => {
    const fetchingRestaurantData = async () => {
      const localStorageKey = `restaurantData-${params.restaurantId}`;

      try {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setRestaurantData(parsedData.restaurantData);
          setMenuForItems(parsedData.menuForItems);
          setImages({ ...parsedData.images, loaded: true });
          console.log("Data loaded from the local storage!");
          setIsLoading(false);
          setMenuLoading(false);
          return;
        }

        const response = await fetch(
          `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/getRestaurant?restaurantId=${params.restaurantId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRestaurantData(data.data.restaurant);
        console.log("menu Data: ", data.data.menu);
        setMenuForItems(data.data.menu);
        // setImages(data.data.images[0]);
        setImages({ ...data.data.images[0], loaded: true });

        if (
          !data.data.images[0].imageurls ||
          data.data.images[0].imageurls.length === 0
        ) {
          console.warn("No image URLs found");
        }

        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            restaurantData: data.data.restaurant,
            menuForItems: data.data.menu,
            // images: data.data.images[0],
            images: { ...data.data.images[0], loaded: true },
          })
        );

        console.log("Data saved to the local storage!");
        setIsLoading(false);
        setMenuLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data", error);
        setIsLoading(false);
        setMenuLoading(false);
      }
    };
    fetchingRestaurantData();
  }, [params.restaurantId]);

  const handleAddToCart = (item) => {
    addCart(item);
  };

  const handleRemoveFromCart = (item) => {
    removeCart(item);
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="bg-gray-100 min-h-screen pb-28">
      <Header name="dummy" onBack={() => console.log("Go back")} />
      <main>
        {images &&
          images.loaded &&
          images.imageurls &&
          images.imageurls.length > 0 ? (
          <div className="relative">
            <PhotoSlider images={images.imageurls} />
          </div>
        ) : (
          <SliderLoader />
        )}
        <div className="p-4 bg-white shadow-md">
          <RestaurantInfo
            name={restaurantData.restaurantName}
            rating={restaurantData.rating}
            distance={"1.2"}
          />
          <QuickActions />
        </div>
        <Description
          text={
            "Experience culinary excellence at Gourmet Delights. Our chefs craft exquisite dishes using the finest ingredients, offering a perfect blend of traditional flavors and modern gastronomy. Enjoy a sophisticated ambiance perfect for both casual dining and special occasions. From our signature seafood platters to delectable pasta dishes, every meal is a celebratio"
          }
        />
        <Facilities facilities={["Asthetic environment", "Parking"]} />

      </main>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 shadow-md p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Menu</h2>
              <button onClick={() => setShowMenu(false)} className="p-2">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pb-24"> {/* Added padding-bottom for scroll space */}
              <Menu
                items={menuForItems}
                cart={cart}
                onAdd={handleAddToCart}
                onRemove={handleRemoveFromCart}
                isLoading={menuLoading}
              />
            </div>

            {/* Checkout button - fixed at bottom */}
            {totalItems > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-t border-gray-100">
                <CheckoutButton
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-4 left-4 right-4 flex flex-col">
        <ShowMenuButton onClick={() => setShowMenu(true)} />
        {totalItems > 0 && !showMenu && (
          <CheckoutButton totalItems={totalItems} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
}
