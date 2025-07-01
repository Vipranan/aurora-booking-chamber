
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Radio, Zap, CheckCircle, XCircle } from 'lucide-react';

interface AntennaCardProps {
  antenna: {
    id: number;
    name: string;
    type: string;
    frequency: string;
    location: string;
    status: string;
    description: string;
    features: string[];
  };
  onBook: () => void;
}

const AntennaCard = ({ antenna, onBook }: AntennaCardProps) => {
  const isAvailable = antenna.status === 'available';

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isAvailable ? 'bg-gradient-to-br from-emerald-500 to-blue-500' : 'bg-gradient-to-br from-slate-600 to-slate-700'}`}>
              <Radio className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{antenna.name}</CardTitle>
              <CardDescription className="text-slate-400">{antenna.type}</CardDescription>
            </div>
          </div>
          <Badge
            variant={isAvailable ? "default" : "secondary"}
            className={isAvailable ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : "bg-red-500/20 text-red-400 border-red-500/50"}
          >
            {isAvailable ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Available
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                Occupied
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-slate-300 text-sm leading-relaxed">
          {antenna.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-slate-400">Frequency:</span>
            <span className="text-white font-medium">{antenna.frequency}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-purple-400" />
            <span className="text-slate-400">Location:</span>
            <span className="text-white font-medium">{antenna.location}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-300">Features:</p>
          <div className="flex flex-wrap gap-2">
            {antenna.features.map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-slate-600 text-slate-400"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button
          onClick={onBook}
          disabled={!isAvailable}
          className={`w-full ${
            isAvailable
              ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'Book Chamber' : 'Currently Unavailable'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AntennaCard;
