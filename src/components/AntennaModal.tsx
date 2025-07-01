import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Antenna {
  id?: number;
  name: string;
  type: string;
  frequency: string;
  location: string;
  status: string;
  description: string;
  features: string[];
  lastMaintenance: string;
}

interface AntennaModalProps {
  isOpen: boolean;
  onClose: () => void;
  antenna?: Antenna | null;
  onSave: (antenna: Antenna) => void;
}

const AntennaModal = ({ isOpen, onClose, antenna, onSave }: AntennaModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Antenna>({
    name: '',
    type: '',
    frequency: '',
    location: '',
    status: 'available',
    description: '',
    features: [],
    lastMaintenance: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (antenna) {
      setFormData(antenna);
    } else {
      setFormData({
        name: '',
        type: '',
        frequency: '',
        location: '',
        status: 'available',
        description: '',
        features: [],
        lastMaintenance: new Date().toISOString().split('T')[0]
      });
    }
  }, [antenna, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.frequency || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    toast({
      title: "Success",
      description: `Antenna ${antenna ? 'updated' : 'created'} successfully.`,
    });
    onClose();
  };

  const handleFeaturesChange = (value: string) => {
    const features = value.split(',').map(f => f.trim()).filter(f => f.length > 0);
    setFormData(prev => ({ ...prev, features }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {antenna ? 'Edit Antenna' : 'Add New Antenna'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {antenna ? 'Update antenna configuration' : 'Configure a new antenna chamber'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., Aurora Array Alpha"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-slate-300">Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select antenna type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="High-Frequency">High-Frequency</SelectItem>
                <SelectItem value="Very High Frequency">Very High Frequency</SelectItem>
                <SelectItem value="Ultra-High Frequency">Ultra-High Frequency</SelectItem>
                <SelectItem value="Microwave">Microwave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-slate-300">Frequency Range *</Label>
            <Input
              id="frequency"
              value={formData.frequency}
              onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., 1-30 MHz"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-300">Location *</Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select chamber location" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="North Chamber">North Chamber</SelectItem>
                <SelectItem value="South Chamber">South Chamber</SelectItem>
                <SelectItem value="East Chamber">East Chamber</SelectItem>
                <SelectItem value="West Chamber">West Chamber</SelectItem>
                <SelectItem value="Central Chamber">Central Chamber</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Antenna description and capabilities"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features" className="text-slate-300">Features</Label>
            <Input
              id="features"
              value={formData.features.join(', ')}
              onChange={(e) => handleFeaturesChange(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., 360° Rotation, Auto-tracking, Weather Resistant"
            />
            <p className="text-xs text-slate-500">Separate features with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastMaintenance" className="text-slate-300">Last Maintenance</Label>
            <Input
              id="lastMaintenance"
              type="date"
              value={formData.lastMaintenance}
              onChange={(e) => setFormData(prev => ({ ...prev, lastMaintenance: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              {antenna ? 'Update' : 'Create'} Antenna
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AntennaModal;