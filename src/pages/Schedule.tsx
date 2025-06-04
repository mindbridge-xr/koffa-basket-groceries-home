
import React, { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Calendar, Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meal' | 'chef' | 'family' | 'other';
  assignee?: string;
  description?: string;
}

export const Schedule: React.FC = () => {
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const events: Event[] = [
    {
      id: '1',
      title: 'Weekly Grocery Shopping',
      date: '2024-01-15',
      time: '10:00',
      type: 'meal',
      assignee: 'Sarah'
    },
    {
      id: '2',
      title: 'Chef Booking - Italian Night',
      date: '2024-01-18',
      time: '18:00',
      type: 'chef',
      assignee: 'Mike'
    },
    {
      id: '3',
      title: 'Family Movie Night',
      date: '2024-01-19',
      time: '19:30',
      type: 'family'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meal': return '🍽️';
      case 'chef': return '👨‍🍳';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return '📅';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meal': return 'bg-green-100 text-green-800';
      case 'chef': return 'bg-primary/10 text-primary';
      case 'family': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateEvent = () => {
    if (newEventTitle.trim() && newEventDate && newEventTime) {
      console.log('Creating event:', { 
        title: newEventTitle, 
        date: newEventDate, 
        time: newEventTime 
      });
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
      setShowNewEventDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="mobile-padding">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-bold text-2xl text-foreground font-poppins">Family Schedule</h1>
                <p className="text-sm text-muted-foreground font-inter">Plan meals and activities</p>
              </div>
            </div>
            <Button
              onClick={() => setShowNewEventDialog(true)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </Button>
          </div>
        </div>
      </div>

      <div className="mobile-spacing">
        {/* Today's Events */}
        <div className="space-y-4 mb-6">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Today's Schedule</h2>
          <div className="card-familyhub p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground font-poppins">Monday, January 15</span>
            </div>
            <div className="space-y-3">
              {events.filter(event => event.date === '2024-01-15').map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getEventIcon(event.type)}</span>
                    <div>
                      <h3 className="font-medium text-foreground font-poppins">{event.title}</h3>
                      <p className="text-sm text-muted-foreground font-inter">{event.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getEventColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Upcoming Events</h2>
          <div className="space-y-3">
            {events.filter(event => event.date !== '2024-01-15').map(event => (
              <div key={event.id} className="card-familyhub p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getEventIcon(event.type)}</span>
                    <div>
                      <h3 className="font-medium text-foreground mb-1 font-poppins">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>{event.time}</span>
                        {event.assignee && (
                          <div className="flex items-center space-x-1">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {event.assignee[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>{event.assignee}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getEventColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowNewEventDialog(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-200 z-40"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      <BottomNav />

      {/* New Event Dialog */}
      <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
        <DialogContent className="card-familyhub mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Add New Event</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                Event Title
              </label>
              <Input
                placeholder="What's happening?"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="input-familyhub"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Date
                </label>
                <Input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="input-familyhub"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Time
                </label>
                <Input
                  type="time"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="input-familyhub"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowNewEventDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateEvent}
              disabled={!newEventTitle.trim() || !newEventDate || !newEventTime}
              className="btn-primary flex-1"
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
