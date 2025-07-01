import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings, Users, BarChart3, Radio, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import AntennaModal from '@/components/AntennaModal';
import BookingManagementModal from '@/components/BookingManagementModal';

interface Antenna {
  id: number;
  name: string;
  type: string;
  frequency: string;
  location: string;
  status: string;
  description: string;
  features: string[];
  lastMaintenance: string;
}

interface Booking {
  id: number;
  antennaName: string;
  user: string;
  date: string;
  time: string;
  purpose: string;
  status: string;
  notes?: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [antennas, setAntennas] = useState<Antenna[]>([
    {
      id: 1,
      name: "Aurora Array Alpha",
      type: "High-Frequency",
      frequency: "1-30 MHz",
      location: "North Chamber",
      status: "available",
      description: "Primary HF antenna system for long-range communications",
      features: ["360° Rotation", "Auto-tracking", "Weather Resistant"],
      lastMaintenance: "2024-06-15"
    },
    {
      id: 2,
      name: "Borealis Beta",
      type: "Ultra-High Frequency",
      frequency: "300-3000 MHz",
      location: "East Chamber",
      status: "occupied",
      description: "Advanced UHF system for satellite communications",
      features: ["Dual Polarization", "Low Noise", "High Gain"],
      lastMaintenance: "2024-06-10"
    },
    {
      id: 3,
      name: "Polaris Prime",
      type: "Very High Frequency",
      frequency: "30-300 MHz",
      location: "West Chamber",
      status: "available",
      description: "Versatile VHF antenna for research and testing",
      features: ["Multi-band", "Remote Control", "Data Logging"],
      lastMaintenance: "2024-06-20"
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      antennaName: "Aurora Array Alpha",
      user: "Dr. Sarah Chen",
      date: "2024-07-02",
      time: "14:00 - 16:00",
      purpose: "Research Testing",
      status: "confirmed"
    },
    {
      id: 2,
      antennaName: "Polaris Prime",
      user: "Prof. Mark Wilson",
      date: "2024-07-03",
      time: "09:00 - 12:00",
      purpose: "Signal Analysis",
      status: "pending"
    }
  ]);

  // Modal states
  const [isAntennaModalOpen, setIsAntennaModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedAntenna, setSelectedAntenna] = useState<Antenna | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Antenna management functions
  const handleAddAntenna = () => {
    setSelectedAntenna(null);
    setIsAntennaModalOpen(true);
  };

  const handleEditAntenna = (antenna: Antenna) => {
    setSelectedAntenna(antenna);
    setIsAntennaModalOpen(true);
  };

  const handleDeleteAntenna = (antennaId: number) => {
    setAntennas(prev => prev.filter(a => a.id !== antennaId));
    toast({
      title: "Success",
      description: "Antenna deleted successfully.",
    });
  };

  const handleSaveAntenna = (antennaData: Omit<Antenna, 'id'> & { id?: number }) => {
    if (antennaData.id) {
      // Update existing antenna
      setAntennas(prev => prev.map(a => 
        a.id === antennaData.id ? { ...antennaData, id: antennaData.id } : a
      ));
    } else {
      // Add new antenna
      const newId = Math.max(...antennas.map(a => a.id)) + 1;
      setAntennas(prev => [...prev, { ...antennaData, id: newId }]);
    }
  };

  // Booking management functions
  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleApproveBooking = (bookingId: number) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'confirmed' } : b
    ));
  };

  const handleRejectBooking = (bookingId: number) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'rejected' } : b
    ));
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings(prev => prev.map(b => 
      b.id === updatedBooking.id ? updatedBooking : b
    ));
  };

  // Calculate stats
  const availableAntennas = antennas.filter(a => a.status === 'available').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalBookings = bookings.length;

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
              <Link 
                to="/" 
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-slate-400" />
              </Link>
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-slate-400">NSI Chamber Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                <Users className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Chambers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{antennas.length}</div>
              <p className="text-xs text-emerald-400">{availableAntennas} available</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalBookings}</div>
              <p className="text-xs text-blue-400">{pendingBookings} pending review</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">67%</div>
              <p className="text-xs text-purple-400">This week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Maintenance Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-green-400">All up to date</p>
            </CardContent>
          </Card>
        </div>

        {/* Antenna Management */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <Radio className="h-5 w-5 mr-2" />
                  Antenna Management
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage antenna chambers and their configurations
                </CardDescription>
              </div>
              <Button 
                onClick={handleAddAntenna}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Antenna
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/50">
                  <TableHead className="text-slate-300">Name</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Frequency</TableHead>
                  <TableHead className="text-slate-300">Location</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Last Maintenance</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {antennas.map((antenna) => (
                  <TableRow key={antenna.id} className="border-slate-700/50">
                    <TableCell className="text-white font-medium">{antenna.name}</TableCell>
                    <TableCell className="text-slate-300">{antenna.type}</TableCell>
                    <TableCell className="text-slate-300">{antenna.frequency}</TableCell>
                    <TableCell className="text-slate-300">{antenna.location}</TableCell>
                    <TableCell>
                      <Badge
                        variant={antenna.status === 'available' ? "default" : "secondary"}
                        className={
                          antenna.status === 'available'
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                            : "bg-red-500/20 text-red-400 border-red-500/50"
                        }
                      >
                        {antenna.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{antenna.lastMaintenance}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditAntenna(antenna)}
                          className="border-slate-600 text-slate-300"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteAntenna(antenna.id)}
                          className="border-slate-600 text-slate-300"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Booking Management */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Recent Bookings
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage and review chamber reservations
                </CardDescription>
              </div>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                View All Bookings
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/50">
                  <TableHead className="text-slate-300">Antenna</TableHead>
                  <TableHead className="text-slate-300">User</TableHead>
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Time</TableHead>
                  <TableHead className="text-slate-300">Purpose</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="border-slate-700/50">
                    <TableCell className="text-white font-medium">{booking.antennaName}</TableCell>
                    <TableCell className="text-slate-300">{booking.user}</TableCell>
                    <TableCell className="text-slate-300">{booking.date}</TableCell>
                    <TableCell className="text-slate-300">{booking.time}</TableCell>
                    <TableCell className="text-slate-300">{booking.purpose}</TableCell>
                    <TableCell>
                      <Badge
                        variant={booking.status === 'confirmed' ? "default" : "secondary"}
                        className={
                          booking.status === 'confirmed'
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditBooking(booking)}
                          className="border-slate-600 text-slate-300"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        {booking.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => handleApproveBooking(booking.id)}
                            className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/30"
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AntennaModal
        isOpen={isAntennaModalOpen}
        onClose={() => setIsAntennaModalOpen(false)}
        antenna={selectedAntenna}
        onSave={handleSaveAntenna}
      />

      <BookingManagementModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        booking={selectedBooking}
        onUpdate={handleUpdateBooking}
        onApprove={handleApproveBooking}
        onReject={handleRejectBooking}
      />
    </div>
  );
};

export default Admin;