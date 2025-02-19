"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, X, ShoppingCart } from "lucide-react";
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

const Menu = ({ items, cart, onAdd, onRemove }) => {
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
  const [images, setImages] = useState([]);

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
          setImages(parsedData.images);
          console.log("Data loaded from the local storage!");
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
        setImages(data.data.images[0]);

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
            images: data.data.images[0],
          })
        );

        console.log("Data saved to the local storage!");
      } catch (error) {
        console.error("Error fetching restaurant data", error);
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
        {images && images.imageurls && images.imageurls.length > 0 ? (
          <PhotoSlider images={images.imageurls} />
        ) : (
          <div>No images available</div> // Or a placeholder component
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
            <Menu
              items={menuForItems}
              cart={cart}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
            />
            {totalItems > 0 && (
              <div className="sticky bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
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
