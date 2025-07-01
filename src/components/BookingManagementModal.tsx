import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id?: number;
  antennaName: string;
  user: string;
  date: string;
  time: string;
  purpose: string;
  status: string;
  notes?: string;
}

interface BookingManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onUpdate: (booking: Booking) => void;
  onApprove?: (bookingId: number) => void;
  onReject?: (bookingId: number) => void;
}

const BookingManagementModal = ({ 
  isOpen, 
  onClose, 
  booking, 
  onUpdate, 
  onApprove, 
  onReject 
}: BookingManagementModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Booking>({
    antennaName: '',
    user: '',
    date: '',
    time: '',
    purpose: '',
    status: 'pending',
    notes: ''
  });

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    }
  }, [booking, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.antennaName || !formData.user || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onUpdate(formData);
    toast({
      title: "Success",
      description: "Booking updated successfully.",
    });
    onClose();
  };

  const handleApprove = () => {
    if (booking?.id && onApprove) {
      onApprove(booking.id);
      toast({
        title: "Success",
        description: "Booking approved successfully.",
      });
      onClose();
    }
  };

  const handleReject = () => {
    if (booking?.id && onReject) {
      onReject(booking.id);
      toast({
        title: "Success",
        description: "Booking rejected.",
      });
      onClose();
    }
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Manage Booking</DialogTitle>
          <DialogDescription className="text-slate-400">
            Review and update booking details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-400">Current Status:</span>
            <Badge
              variant={formData.status === 'confirmed' ? "default" : "secondary"}
              className={
                formData.status === 'confirmed'
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                  : formData.status === 'pending'
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                  : "bg-red-500/20 text-red-400 border-red-500/50"
              }
            >
              {formData.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user" className="text-slate-300">User *</Label>
            <Input
              id="user"
              value={formData.user}
              onChange={(e) => setFormData(prev => ({ ...prev, user: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="antennaName" className="text-slate-300">Antenna *</Label>
            <Input
              id="antennaName"
              value={formData.antennaName}
              onChange={(e) => setFormData(prev => ({ ...prev, antennaName: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-slate-300">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-slate-300">Time *</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="09:00 - 12:00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-slate-300">Purpose</Label>
            <Input
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-slate-300">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300">Admin Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Add internal notes about this booking"
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <div className="flex flex-col w-full gap-2">
              {formData.status === 'pending' && (
                <div className="flex gap-2">
                  <Button 
                    type="button"
                    onClick={handleApprove}
                    className="flex-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/30"
                  >
                    Approve
                  </Button>
                  <Button 
                    type="button"
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20"
                  >
                    Reject
                  </Button>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  Update
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingManagementModal;