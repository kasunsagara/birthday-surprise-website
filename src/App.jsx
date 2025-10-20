import { useState, useEffect } from "react";
import { FaGift, FaHeart, FaEnvelope, FaSpa, FaStar, FaTimes, FaWhatsapp, FaComments } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const birthday = new Date("2025-01-20T00:00:00"); 
  const [timeLeft, setTimeLeft] = useState({});
  const [showSurprise, setShowSurprise] = useState(false); 
  const [showGifts, setShowGifts] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [showFlowers, setShowFlowers] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = birthday - now;

      if (diff <= 0) {
        clearInterval(timer);
        setShowSurprise(true);
        setConfetti(true);
        startFireworks();
        setTimeout(() => setConfetti(false), 5000);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startFireworks = () => {
    const newFireworks = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      color: getRandomColor(),
      size: Math.random() * 2 + 1,
      particles: Array.from({ length: 40 }, (_, j) => ({
        id: j,
        angle: (j / 40) * 360,
        distance: 0
      }))
    }));
    setFireworks(newFireworks);

    const interval = setInterval(() => {
      setFireworks(prev => [
        ...prev.slice(-6),
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
          color: getRandomColor(),
          size: Math.random() * 2 + 1,
          particles: Array.from({ length: 40 }, (_, j) => ({
            id: j,
            angle: (j / 40) * 360,
            distance: 0
          }))
        }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  };

  const getRandomColor = () => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFEAA7", 
      "#DDA0DD", "#F7DC6F", "#85C1E9", "#FF9F43"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const openGifts = () => {
    setShowGifts(true);
    setConfetti(true);
    startFireworks();
    setTimeout(() => setConfetti(false), 3000);
  };

  const openFlowers = () => {
    setShowFlowers(true);
  };

  const openLoveLetter = () => {
    setShowLoveLetter(true);
  };

  const openContact = () => {
    setShowContact(true);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/94771670585?text=Happy%20Birthday%20My%20Love!%20💖', '_blank');
  };

  // Beautiful flower bouquet images
  const flowerImage = [
    "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  // Firework Component
  const Firework = ({ firework }) => (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${firework.x}%`,
        top: `${firework.y}%`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{
          backgroundColor: firework.color,
          filter: 'brightness(1.2)',
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 2, 0] }}
        transition={{ duration: 0.6 }}
      />
      
      <motion.div
        className="absolute w-8 h-8 rounded-full opacity-30"
        style={{
          backgroundColor: firework.color,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 0] }}
        transition={{ duration: 0.9 }}
      />

      {firework.particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: firework.color,
            width: firework.size,
            height: firework.size,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * 60,
            y: Math.sin((particle.angle * Math.PI) / 180) * 60,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );

  // Countdown Page
  if (!showSurprise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-200 text-opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <FaStar size={20} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-6xl mb-6 text-yellow-300"
        >
          <GiPartyPopper />
        </motion.div>

        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-center mb-6 drop-shadow-lg"
        >
          🎂 Birthday Countdown 🎉
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-30 max-w-md w-full"
        >
          <p className="text-xl text-center mb-6 font-semibold">
            Your special day is coming soon! 💖
          </p>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-white bg-opacity-30 rounded-lg p-3">
                  <motion.span
                    key={value}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold block"
                  >
                    {value ?? 0}
                  </motion.span>
                </div>
                <span className="text-sm uppercase mt-2 block">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-lg font-medium">
            Counting down to November 20, 2025 ⏰
          </p>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-8 text-lg flex items-center gap-2"
        >
          <FaHeart className="text-red-300" />
          <span>Made with love by yours truly</span>
          <FaHeart className="text-red-300" />
        </motion.div>
      </div>
    );
  }

  // Surprise Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-red-400 to-pink-500 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      
      {/* Flowers Overlay with Real Photos */}
      <AnimatePresence>
        {showFlowers && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-3xl p-6 max-w-2xl w-full border-2 border-white border-opacity-20 relative overflow-hidden shadow-2xl"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Close button - CLEARLY VISIBLE */}
              <motion.button
                onClick={() => setShowFlowers(false)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-red-300 transition-colors z-50 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-2xl border-2 border-white"
                whileHover={{ scale: 1.2, backgroundColor: "#ef4444" }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaTimes />
              </motion.button>

              <div className="text-center mb-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
                  💐 For My Beautiful Girlfriend 💐
                </h2>
                <p className="text-lg md:text-xl text-white/90">
                  These flowers are just a small reflection of how beautiful you are
                </p>
              </div>

              {/* Main Flower Bouquet */}
              <motion.div
                className="relative mb-4 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img 
                  src={flowerImage[0]}
                  alt="Beautiful Flower Bouquet"
                  className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <motion.div
                  className="absolute bottom-3 left-3 right-3 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-white text-base md:text-lg font-semibold drop-shadow-lg">
                    "Every petal reminds me of your beauty" 🌸
                  </p>
                </motion.div>
              </motion.div>

              {/* Romantic Message */}
              <motion.div
                className="bg-white bg-opacity-10 rounded-2xl p-4 border border-white border-opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-center text-base md:text-lg text-white leading-relaxed italic">
                  "Just like these beautiful flowers, you bring color and happiness into my life. 
                  Every moment with you is like a blooming garden full of love and joy. 
                  Happy Birthday to the most beautiful flower in my life! 💖"
                </p>
                <motion.p
                  className="text-center text-lg font-semibold mt-3 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Forever Yours, Kasun 🌹
                </motion.p>
              </motion.div>

              {/* Floating Hearts */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-red-300"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.random() * 10 - 5, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    <FaHeart size={16 + Math.random() * 8} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Letter Overlay */}
      <AnimatePresence>
        {showLoveLetter && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-red-600 to-orange-700 rounded-3xl p-6 max-w-lg w-full border-4 border-rose-200 relative overflow-hidden shadow-2xl"
              initial={{ scale: 0, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.button
                onClick={() => setShowLoveLetter(false)}
                className="absolute top-3 right-3 text-white text-xl hover:text-white transition-colors z-50 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-2xl border-2 border-white"
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: "#ef4444",
                  rotate: 90
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <FaTimes />
              </motion.button>

              <div className="text-center mb-4">
                <motion.div
                  className="text-rose-600 text-3xl mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  💌
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif">
                  To My Dearest Love
                </h2>
                <p className="text-white text-sm">On Your Special Day</p>
              </div>

              <motion.div
                className="bg-white rounded-2xl p-4 shadow-inner border border-rose-200 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-3 text-gray-800 leading-relaxed font-serif text-sm md:text-base">
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    My Dearest,
                  </motion.p>

                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    Happy Birthday to my amazing person! You mean everything to me.
                  </motion.p>

                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    You've filled my life with joy. Your smile lights up my world, your laugh is my favorite sound, and your love means everything to me.
                  </motion.p>

                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    You're my best friend and soulmate. Every day with you feels like a wonderful dream.
                  </motion.p>

                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    I wish you endless happiness and love. May all your dreams come true as we build beautiful memories together.
                  </motion.p>

                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.7 }}
                    className="font-semibold text-rose-700"
                  >
                    Forever and always, my love will be with you.
                  </motion.p>
                </div>

                <motion.div
                  className="mt-4 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.1 }}
                >
                  <p className="text-lg font-bold text-rose-800 font-cursive">With all my love,</p>
                  <p className="text-xl font-bold text-rose-900 mt-1 font-cursive">Kasun</p>
                  <p className="text-rose-600 text-sm">💖 Your Loving Boyfriend 💖</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Info Overlay - ලොකු කලා */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-green-600 to-emerald-700 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border-4 border-white relative overflow-hidden shadow-2xl"
              initial={{ scale: 0, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-white transition-colors z-50 bg-red-500 rounded-full w-12 h-12 flex items-center justify-center shadow-2xl border-2 border-white"
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: "#ef4444",
                  rotate: 90
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <FaTimes />
              </motion.button>

              <div className="text-center mb-6">
                <motion.div
                  className="text-white text-4xl mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  📱
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-serif">
                  Let's Connect!
                </h2>
                <p className="text-white/80 text-lg">Always here for you 💚</p>
              </div>

              <motion.div
                className="bg-white/20 rounded-2xl p-6 border border-white/30 relative backdrop-blur-sm mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-4 text-white leading-relaxed text-center">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-xl font-semibold mb-3">Chat with me anytime!</p>
                    <p className="text-lg mb-2">I'm always just a message away</p>
                    <p className="text-white/80">Let's make your birthday even more special! 🎉</p>
                  </motion.div>

                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <motion.button
                      onClick={openWhatsApp}
                      className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-green-50 transition-colors flex items-center justify-center gap-3 mx-auto w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaWhatsapp className="text-xl" />
                      Message Me on WhatsApp
                    </motion.button>
                    <p className="text-white/70 text-sm mt-3">
                      Click to start a conversation with me! 💬
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <p className="text-white/80 text-base">
                  I'm waiting to hear from you, my love! 💖
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fireworks Display */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {fireworks.map((firework) => (
            <Firework key={firework.id} firework={firework} />
          ))}
        </AnimatePresence>
      </div>

      {/* Rising Rockets */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 h-4 bg-yellow-300 rounded-t-full"
            style={{
              left: `${15 + i * 35}%`,
            }}
            initial={{ y: 100, opacity: 1 }}
            animate={{ y: -80, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {confetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
                initial={{
                  y: -50,
                  x: 0,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: "100vh",
                  x: Math.random() * 200 - 100,
                  rotate: 360,
                  opacity: 0,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut",
                }}
              >
                <GiPartyPopper 
                  className={i % 3 === 0 ? "text-yellow-300" : i % 3 === 1 ? "text-pink-300" : "text-blue-300"}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-200 text-opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <FaHeart size={24} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-8"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg flex items-center justify-center gap-3"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaHeart className="text-red-300" />
          Happy Birthday, My Love! 💖
          <FaHeart className="text-red-300" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 font-light bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 inline-block"
        >
          You make my world brighter every single day ✨
        </motion.p>
      </motion.div>

      <div className="max-w-4xl w-full">
        {!showGifts ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center cursor-pointer"
            onClick={openGifts}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white border-opacity-50"
            >
              <FaGift className="text-white text-5xl" />
            </motion.div>
            <motion.p
              className="text-2xl font-semibold bg-white bg-opacity-20 backdrop-blur-lg rounded-full px-8 py-4 inline-block"
              whileHover={{ scale: 1.1 }}
            >
              Click to open your gift! 💝
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { 
                icon: FaSpa, 
                text: "Beautiful Flower", 
                color: "from-blue-400 to-cyan-500",
                onClick: openFlowers
              },
              { 
                icon: FaEnvelope, 
                text: "Love Letter", 
                color: "from-red-400 to-orange-500",
                onClick: openLoveLetter
              },
              { 
                icon: FaComments, 
                text: "Talk to me", 
                color: "from-green-400 to-emerald-500",
                onClick: openContact
              },              
            ].map((gift, index) => (
              <motion.div
                key={gift.text}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10 
                }}
                className={`bg-gradient-to-br ${gift.color} rounded-2xl p-6 text-center shadow-2xl border-2 border-white border-opacity-30 backdrop-blur-sm cursor-pointer`}
                onClick={gift.onClick}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="text-4xl mb-4 text-white"
                >
                  <gift.icon />
                </motion.div>
                <p className="text-xl font-semibold">{gift.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-lg font-medium bg-white bg-opacity-20 backdrop-blur-lg rounded-full px-6 py-3"
      >
        Made with 💖 by Kasun 
      </motion.footer>
    </div>
  );
}