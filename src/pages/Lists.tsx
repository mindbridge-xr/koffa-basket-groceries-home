
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { ListCard } from '@/components/ListCard';
import { SmartListsDialog } from '@/components/SmartListsDialog';
import { TemplatesDialog } from '@/components/TemplatesDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PageHeader } from '@/components/PageHeader';
import { Search, Plus, Sparkles, FileText, ShoppingCart } from 'lucide-react';

const Lists = () => {
  const { lists, createList } = useApp();
  const navigate = useNavigate();
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [showSmartDialog, setShowSmartDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
      setShowNewListDialog(false);
    }
  };

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quickActions = [
    {
      title: "Smart Lists",
      description: "AI-powered suggestions",
      icon: Sparkles,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      onClick: () => setShowSmartDialog(true)
    },
    {
      title: "Templates",
      description: "Pre-made list templates",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      onClick: () => setShowTemplatesDialog(true)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-24">
      <PageHeader 
        title="My Lists"
        subtitle="Organize your family's shopping and tasks"
        showBack={true}
        onBack={() => navigate('/')}
      >
        <Button
          onClick={() => setShowNewListDialog(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-1" />
          New List
        </Button>
      </PageHeader>

      <div className="mobile-spacing space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search your lists..."
            className="input-familyhub pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="card-familyhub-hover p-4 text-left"
              >
                <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1 font-poppins">
                  {action.title}
                </h3>
                <p className="text-xs text-muted-foreground font-inter">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Lists */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg text-foreground font-poppins">
              Your Lists ({filteredLists.length})
            </h2>
          </div>

          {filteredLists.length > 0 ? (
            <div className="grid gap-4">
              {filteredLists.map((list) => (
                <ListCard 
                  key={list.id} 
                  list={list} 
                  onClick={() => navigate(`/list/${list.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="card-familyhub p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">
                {searchQuery ? 'No matching lists' : 'No lists yet'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 font-inter">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Create your first list to get started organizing your family\'s needs'
                }
              </p>
              {!searchQuery && (
                <Button 
                  onClick={() => setShowNewListDialog(true)}
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First List
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <FloatingActionButton 
        onClick={() => setShowNewListDialog(true)} 
        label="New List"
        icon={<Plus className="h-5 w-5" />}
        className="bg-gradient-primary shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
      />

      <BottomNav />

      {/* Dialogs */}
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent className="card-familyhub mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Input
              placeholder="List name (e.g., Weekly Groceries)"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="input-familyhub"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateList();
                }
              }}
            />
            <p className="text-sm text-muted-foreground font-inter">
              Tip: Use descriptive names like "Weekly Groceries" or "Birthday Party Shopping"
            </p>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowNewListDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateList}
              disabled={!newListName.trim()}
              className="btn-primary flex-1"
            >
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SmartListsDialog open={showSmartDialog} onOpenChange={setShowSmartDialog} />
      <TemplatesDialog open={showTemplatesDialog} onOpenChange={setShowTemplatesDialog} />
    </div>
  );
};

export default Lists;
