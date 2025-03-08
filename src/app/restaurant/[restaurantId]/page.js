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
  MapPin,
  Beef, Fish, Salad, Cookie, Drumstick, Sandwich, Egg, ThumbsUp, Flame, Leaf, Filter, Search, Heart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const EnhancedMenuItem = ({ item, quantity, onAdd, onRemove }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [animation, setAnimation] = React.useState(false);

  const handleAddWithAnimation = () => {
    setAnimation(true);
    onAdd(item);
    setTimeout(() => setAnimation(false), 500);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <motion.div
      layout
      className="border-b border-gray-100 last:border-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "rgba(254, 242, 242, 0.5)" }}
    >
      <div className="p-4 flex gap-3 relative">
        {/* Image with conditional badge */}
        <div className="relative min-w-[100px] h-[100px]">
          <div className="w-full h-full rounded-lg overflow-hidden bg-red-50">
            <motion.img
              src={item.imageurl || "https://placehold.co/100x100?text=Dish"}
              alt={item.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
            />
            {item.bestseller && (
              <div className="absolute top-1 left-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded">
                <ThumbsUp className="w-3 h-3 inline mr-0.5" /> Popular
              </div>
            )}
          </div>

          {/* Diet indicator */}
          {item.itemtype && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full shadow-md p-1">
              <div className={`rounded-full p-1 ${item.itemtype === 'veg' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                <Leaf className={`w-3 h-3 ${item.itemtype === 'veg' ? 'text-green-600' : 'text-red-600'
                  }`} />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-1">{item.description}</p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-red-500 text-xs flex items-center"
            >
              {expanded ? "Less" : "More"}
            </button>
          </div>

          {/* Tags */}
          {item.category && (
            <div className="mt-1 mb-2">
              <span className="inline-block bg-red-50 text-red-800 text-xs px-2 py-1 rounded-full">
                {item.category}
              </span>
              {item.spicy && (
                <span className="inline-block bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded-full ml-1">
                  <Flame className="w-3 h-3 inline mr-1" />
                  Spicy
                </span>
              )}
            </div>
          )}

          {/* Expanded details section */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-xs text-gray-500 mt-1 mb-2"
            >
              <div className="space-y-1">
                {item.containsdairy && <p>• Contains dairy</p>}
                <p>• Preparation time: ~15 mins</p>
                <p>• Calories: 320 kcal</p>
              </div>
            </motion.div>
          )}

          {/* Price and actions */}
          <div className="flex justify-between items-center mt-auto">
            <p className="font-semibold text-red-600">₹{item.price}</p>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1 rounded-full ${quantity > 0 ? 'bg-red-500 text-white' : 'border border-red-500 text-red-500'}`}
                onClick={() => onAdd(item)}
              >
                <Heart className="w-4 h-4" />
              </motion.button>

              {quantity > 0 ? (
                <div className="flex items-center bg-white border border-red-200 rounded-full">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-7 h-7 flex items-center justify-center text-red-500"
                    onClick={() => onRemove(item)}
                  >
                    -
                  </motion.button>
                  <span className="text-sm font-medium text-gray-800 w-5 text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-7 h-7 flex items-center justify-center text-red-500"
                    onClick={() => onAdd(item)}
                  >
                    +
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white rounded-full py-1 px-3 text-sm font-medium flex items-center"
                  onClick={handleAddWithAnimation}
                >
                  {animation ? (
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                    >
                      Added
                    </motion.div>
                  ) : (
                    <>Add</>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EnhancedMenu = ({ items, cart, onAdd, onRemove, isLoading }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("all");

  // Group items by category
  const categories = isLoading ? [] : [...new Set(items.map(item => item.category || "Other"))];

  // Filter items based on search and category
  const filteredItems = isLoading
    ? []
    : items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeFilter === "all" || item.category === activeFilter;
      return matchesSearch && matchesCategory;
    });

  const popularItems = isLoading ? [] : [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3);

  if (isLoading) {
    return <MenuItemsLoader />;
  }

  return (
    <div className="pb-20">
      {/* Search and filter */}
      <div className="sticky top-[65px] z-10 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 border-gray-200 focus:border-red-500 focus:ring-red-500 text-sm w-full"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-red-50 text-red-600 p-2 rounded-lg"
          >
            <Filter className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto pb-1">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="bg-red-50 p-1 h-auto flex space-x-1 w-max">
              <TabsTrigger
                value="all"
                className="h-7 px-3 text-xs data-[state=active]:bg-red-500 data-[state=active]:text-white"
                onClick={() => setActiveFilter("all")}
              >
                All
              </TabsTrigger>

              <TabsTrigger
                value="popular"
                className="h-7 px-3 text-xs data-[state=active]:bg-red-500 data-[state=active]:text-white"
                onClick={() => setActiveFilter("popular")}
              >
                Popular
              </TabsTrigger>

              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="h-7 px-3 text-xs data-[state=active]:bg-red-500 data-[state=active]:text-white whitespace-nowrap"
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Menu sections */}
      {activeFilter === "popular" && (
        <div className="mb-4 pt-2">
          <div className="px-4 py-2 bg-amber-50 flex items-center">
            <ThumbsUp className="w-4 h-4 text-amber-600 mr-2" />
            <h2 className="text-amber-800 font-semibold">Most Popular</h2>
          </div>
          {popularItems.map((item) => (
            <EnhancedMenuItem
              key={item.id}
              item={item}
              quantity={cart[item.name]?.quantity || 0}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      {activeFilter === "all" ? (
        // Group by category when showing all
        categories.map((category) => {
          const categoryItems = items.filter(item => (item.category || "Other") === category);
          return (
            <div key={category} className="mb-4">
              <div className="px-4 py-2 bg-red-50 flex items-center">
                <Utensils className="w-4 h-4 text-red-600 mr-2" />
                <h2 className="text-red-800 font-semibold">{category}</h2>
                <span className="text-xs text-red-600 ml-2">({categoryItems.length})</span>
              </div>
              {categoryItems.map((item) => (
                <EnhancedMenuItem
                  key={item.id}
                  item={item}
                  quantity={cart[item.name]?.quantity || 0}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </div>
          );
        })
      ) : (
        // Show filtered items
        <div className="mb-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <EnhancedMenuItem
                key={item.id}
                item={item}
                quantity={cart[item.name]?.quantity || 0}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="bg-red-50 p-6 rounded-lg inline-block mb-3">
                <Utensils className="w-8 h-8 text-red-400 mx-auto" />
              </div>
              <h3 className="text-gray-800 font-medium">No items found</h3>
              <p className="text-gray-500 text-sm mt-1">Try another search term or filter</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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

const CuisineCategory = ({ icon: Icon, name, count, active = false }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex flex-col items-center p-3 rounded-xl min-w-[100px] ${active ? "bg-red-50 border-red-200 border" : "bg-white"
      }`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${active ? "bg-red-500" : "bg-red-100"
      }`}>
      <Icon className={`w-6 h-6 ${active ? "text-white" : "text-red-500"}`} />
    </div>
    <p className={`text-xs font-medium ${active ? "text-red-700" : "text-gray-700"}`}>{name}</p>
    <p className="text-xs text-gray-500">{count} items</p>
  </motion.div>
);

const getCuisines = () => [
  { name: "Italian", icon: Pizza, count: 12, active: true },
  { name: "Indian", icon: ChefHat, count: 8 },
  { name: "Steaks", icon: Beef, count: 5 },
  { name: "Seafood", icon: Fish, count: 7 },
  { name: "Salads", icon: Salad, count: 6 },
  { name: "Coffee", icon: Coffee, count: 4 },
  { name: "Desserts", icon: Cookie, count: 9 },
  { name: "Chicken", icon: Drumstick, count: 11 },
  { name: "Sandwiches", icon: Sandwich, count: 8 },
  { name: "Breakfast", icon: Egg, count: 6 }
];

const CuisineSection = () => {
  const cuisines = getCuisines();

  return (
    <div className="p-4 bg-white shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-3 text-red-800">Explore by Cuisine</h2>
      <p className="text-sm text-gray-500 mb-4">Discover our diverse menu categories</p>

      <div className="overflow-x-auto pb-2">
        <motion.div
          className="flex space-x-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CuisineCategory
                icon={cuisine.icon}
                name={cuisine.name}
                count={cuisine.count}
                active={cuisine.active}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-4 bg-red-50 rounded-lg p-4 border border-red-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-red-800">Dish of the Chef</h3> {/* Fixed apostrophe */}
            <p className="text-sm text-gray-600">Try our award-winning Margherita Pizza!</p>
          </div>
        </div>
      </motion.div>
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
        <CuisineSection />
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
            {/* <div className="flex-1 overflow-y-auto">
              <EnhancedMenu
                items={menuForItems}
                cart={cart}
                onAdd={handleAddToCart}
                onRemove={handleRemoveFromCart}
                isLoading={menuLoading}
              />
            </div> */}

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
