
import { useState } from 'react';
import { Calendar, Clock, MapPin, Zap, Radio, Satellite } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingModal from '@/components/BookingModal';
import AntennaCard from '@/components/AntennaCard';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAntenna, setSelectedAntenna] = useState(null);

  const antennas = [
    {
      id: 1,
      name: "Aurora Array Alpha",
      type: "High-Frequency",
      frequency: "1-30 MHz",
      location: "North Chamber",
      status: "available",
      description: "Primary HF antenna system for long-range communications",
      features: ["360° Rotation", "Auto-tracking", "Weather Resistant"]
    },
    {
      id: 2,
      name: "Borealis Beta",
      type: "Ultra-High Frequency",
      frequency: "300-3000 MHz",
      location: "East Chamber",
      status: "occupied",
      description: "Advanced UHF system for satellite communications",
      features: ["Dual Polarization", "Low Noise", "High Gain"]
    },
    {
      id: 3,
      name: "Polaris Prime",
      type: "Very High Frequency",
      frequency: "30-300 MHz",
      location: "West Chamber",
      status: "available",
      description: "Versatile VHF antenna for research and testing",
      features: ["Multi-band", "Remote Control", "Data Logging"]
    }
  ];

  const handleBooking = (antenna) => {
    setSelectedAntenna(antenna);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg">
                <Radio className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NSI Chamber Booking</h1>
                <p className="text-sm text-slate-400">Antenna Reservation System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                asChild
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <a href="/admin">Admin</a>
              </Button>
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                <Zap className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Antenna Chambers
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Reserve cutting-edge antenna systems for your research, testing, and communication needs. 
              Our state-of-the-art chambers provide optimal conditions for signal analysis and experimentation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-300">3 Active Chambers</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300">24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2">
                <Satellite className="h-4 w-4 text-purple-400" />
                <span className="text-slate-300">Multi-band Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Antenna Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Available Antenna Systems</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Choose from our collection of specialized antenna chambers, each designed for specific frequency ranges and applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {antennas.map((antenna) => (
              <AntennaCard
                key={antenna.id}
                antenna={antenna}
                onBook={() => handleBooking(antenna)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative z-10 py-16 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">95%</div>
              <div className="text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1-30GHz</div>
              <div className="text-slate-400">Frequency Range</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-slate-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">3</div>
              <div className="text-slate-400">Active Chambers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-900/80 backdrop-blur-sm py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-slate-400">
            © 2024 NSI Chamber Booking. Advanced antenna systems for research and development.
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        antenna={selectedAntenna}
      />
    </div>
  );
};

export default Index;
