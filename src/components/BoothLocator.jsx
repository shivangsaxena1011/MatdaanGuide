import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, Search } from 'lucide-react';

const BoothLocator = () => {
  const [pinCode, setPinCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockBooths = [
    { name: "Govt. High School", address: "Sector 14, Main Road", distance: "0.8 km", waitTime: "15 mins", type: "General" },
    { name: "Community Center Hall", address: "Sector 15, Near Park", distance: "1.2 km", waitTime: "5 mins", type: "Women Friendly" },
    { name: "Primary Health Center", address: "Sector 12, Market Area", distance: "2.5 km", waitTime: "30 mins", type: "General" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if(pinCode.length < 6) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 1500);
  };

  const handleLocateMe = () => {
    setLoading(true);
    // Simulate geolocation delay
    setTimeout(() => {
      setPinCode('110001');
      setLoading(false);
      setSearched(true);
    }, 2000);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          Find Your Polling Booth
          <span className="text-xs font-semibold bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full border border-brand-500/30">Demo</span>
        </h1>
        <p className="text-gray-400">Enter your PIN code or use your current location to find where you need to vote.</p>
        <p className="text-xs text-brand-400 mt-2">Note: This is a demonstration feature using mock data.</p>
      </div>

      <div className="glass-panel p-6 md:p-8 max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              maxLength="6"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit PIN Code"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            disabled={pinCode.length < 6 || loading}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 disabled:bg-gray-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center min-w-[120px]"
          >
            {loading ? <span className="animate-pulse">Searching...</span> : 'Search'}
          </button>
        </form>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="text-sm text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>

        <button 
          onClick={handleLocateMe}
          disabled={loading}
          className="mt-4 w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Navigation className="h-5 w-5 text-brand-400" />
          Use My Current Location
        </button>
      </div>

      {searched && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="col-span-full mb-2">
            <h3 className="text-xl font-semibold text-white">Results for {pinCode}</h3>
            <p className="text-sm text-gray-400">Found {mockBooths.length} booths nearby. Remember, you can only vote at your designated booth as per your Voter Slip.</p>
          </div>

          {mockBooths.map((booth, idx) => (
            <div key={idx} className="glass-panel p-6 hover:border-brand-500/30 transition-colors flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-full bg-brand-500/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-brand-500" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-gray-800 rounded-md text-gray-300">
                  {booth.type}
                </span>
              </div>
              
              <h4 className="text-lg font-bold text-white mb-1">{booth.name}</h4>
              <p className="text-sm text-gray-400 mb-4 flex-1">{booth.address}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <Navigation className="h-3.5 w-3.5" /> Distance
                  </div>
                  <div className="font-semibold text-white">{booth.distance}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <Clock className="h-3.5 w-3.5" /> Est. Wait
                  </div>
                  <div className="font-semibold text-white">{booth.waitTime}</div>
                </div>
              </div>

              <button className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-brand-400 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <Navigation className="h-4 w-4" /> Get Directions
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BoothLocator;
