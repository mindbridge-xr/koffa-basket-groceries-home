
import React, { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { Plus, Calendar, Clock, Users, ChefHat, Share2, StickyNote, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meal' | 'chef' | 'family' | 'other';
  assignee?: string;
  description?: string;
  notes?: string;
  sharedWith?: string[];
}

interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
}

export const Schedule: React.FC = () => {
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventNotes, setNewEventNotes] = useState('');
  const [eventNotes, setEventNotes] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { toast } = useToast();

  const familyMembers: FamilyMember[] = [
    { id: '1', name: 'Sarah' },
    { id: '2', name: 'Mike' },
    { id: '3', name: 'Emma' },
    { id: '4', name: 'Josh' }
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'Weekly Grocery Shopping',
      date: '2024-01-15',
      time: '10:00',
      type: 'meal',
      assignee: 'Sarah',
      notes: 'Don\'t forget organic vegetables and Emma\'s favorite cereal',
      sharedWith: ['1', '2']
    },
    {
      id: '2',
      title: 'Chef Booking - Italian Night',
      date: '2024-01-18',
      time: '18:00',
      type: 'chef',
      assignee: 'Mike',
      notes: 'Requested gluten-free pasta options',
      sharedWith: ['1', '2', '3']
    },
    {
      id: '3',
      title: 'Family Movie Night',
      date: '2024-01-19',
      time: '19:30',
      type: 'family',
      notes: 'Emma picks the movie this week',
      sharedWith: ['1', '2', '3', '4']
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
        time: newEventTime,
        notes: newEventNotes,
        sharedWith: selectedMembers
      });
      toast({
        title: "Event Created!",
        description: `${newEventTitle} has been added to your schedule`,
      });
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
      setNewEventNotes('');
      setSelectedMembers([]);
      setShowNewEventDialog(false);
    }
  };

  const handleShowNotes = (event: Event) => {
    setSelectedEvent(event);
    setEventNotes(event.notes || '');
    setShowNotesDialog(true);
  };

  const handleSaveNotes = () => {
    if (selectedEvent) {
      console.log('Saving notes for event:', selectedEvent.id, eventNotes);
      toast({
        title: "Notes Saved!",
        description: "Event notes have been updated",
      });
      setShowNotesDialog(false);
    }
  };

  const handleShareEvent = (event: Event) => {
    setSelectedEvent(event);
    setSelectedMembers(event.sharedWith || []);
    setShowShareDialog(true);
  };

  const handleSaveSharing = () => {
    if (selectedEvent) {
      console.log('Updating sharing for event:', selectedEvent.id, selectedMembers);
      toast({
        title: "Sharing Updated!",
        description: `Event shared with ${selectedMembers.length} family members`,
      });
      setShowShareDialog(false);
    }
  };

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-24">
      <PageHeader 
        title="Family Schedule"
        subtitle="Plan meals and activities"
        showBack={true}
      >
        <Button
          onClick={() => setShowNewEventDialog(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Event
        </Button>
      </PageHeader>

      <div className="mobile-spacing space-y-6">
        {/* Today's Events */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Today's Schedule</h2>
          <div className="card-familyhub p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground font-poppins">Monday, January 15</span>
            </div>
            <div className="space-y-3">
              {events.filter(event => event.date === '2024-01-15').map(event => (
                <div key={event.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl mt-1">{getEventIcon(event.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground font-poppins">{event.title}</h3>
                      <p className="text-sm text-muted-foreground font-inter">{event.time}</p>
                      {event.notes && (
                        <p className="text-xs text-muted-foreground font-inter mt-1 line-clamp-2">
                          📝 {event.notes}
                        </p>
                      )}
                      {event.sharedWith && event.sharedWith.length > 0 && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-inter">
                            Shared with {event.sharedWith.length} member{event.sharedWith.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-3">
                    <Badge className={`text-xs ${getEventColor(event.type)}`}>
                      {event.type}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground"
                        onClick={() => handleShowNotes(event)}
                      >
                        <StickyNote className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground"
                        onClick={() => handleShareEvent(event)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{getEventIcon(event.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1 font-poppins">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter mb-2">
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
                      {event.notes && (
                        <p className="text-xs text-muted-foreground font-inter line-clamp-2">
                          📝 {event.notes}
                        </p>
                      )}
                      {event.sharedWith && event.sharedWith.length > 0 && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground font-inter">
                            Shared with {event.sharedWith.length} member{event.sharedWith.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-3">
                    <Badge className={`text-xs ${getEventColor(event.type)}`}>
                      {event.type}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground"
                        onClick={() => handleShowNotes(event)}
                      >
                        <StickyNote className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground"
                        onClick={() => handleShareEvent(event)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
        <DialogContent className="card-familyhub mx-4 max-w-md">
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
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                Notes (Optional)
              </label>
              <Textarea
                placeholder="Add any additional details..."
                value={newEventNotes}
                onChange={(e) => setNewEventNotes(e.target.value)}
                className="input-familyhub min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                Share with Family Members
              </label>
              <div className="grid grid-cols-2 gap-2">
                {familyMembers.map(member => (
                  <button
                    key={member.id}
                    onClick={() => toggleMemberSelection(member.id)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedMembers.includes(member.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 text-muted-foreground hover:border-gray-300'
                    }`}
                  >
                    <UserCheck className="h-4 w-4 mx-auto mb-1" />
                    <div className="text-xs font-medium font-inter">{member.name}</div>
                  </button>
                ))}
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

      {/* Notes Dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent className="card-familyhub mx-4 max-w-md">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Event Notes</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Add notes for this event..."
              value={eventNotes}
              onChange={(e) => setEventNotes(e.target.value)}
              className="input-familyhub min-h-[120px]"
            />
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowNotesDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNotes}
              className="btn-primary flex-1"
            >
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="card-familyhub mx-4 max-w-md">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Share Event</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium text-foreground mb-3 font-inter">
              Select family members to share with:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {familyMembers.map(member => (
                <button
                  key={member.id}
                  onClick={() => toggleMemberSelection(member.id)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedMembers.includes(member.id)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 text-muted-foreground hover:border-gray-300'
                  }`}
                >
                  <UserCheck className="h-4 w-4 mx-auto mb-1" />
                  <div className="text-xs font-medium font-inter">{member.name}</div>
                </button>
              ))}
            </div>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowShareDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveSharing}
              className="btn-primary flex-1"
            >
              Update Sharing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
