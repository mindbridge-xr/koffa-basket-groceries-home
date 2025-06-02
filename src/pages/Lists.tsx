
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit, 
  Share2, 
  Users,
  Calendar,
  ShoppingCart
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Lists: React.FC = () => {
  const { lists, createList, deleteList, updateList } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [editingList, setEditingList] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
      setShowNewListDialog(false);
      toast({
        title: "List created",
        description: `"${newListName.trim()}" has been created successfully.`,
      });
    }
  };

  const handleDeleteList = (listId: string, listName: string) => {
    deleteList(listId);
    toast({
      title: "List deleted",
      description: `"${listName}" has been deleted.`,
    });
  };

  const handleEditList = (listId: string, newName: string) => {
    updateList(listId, { name: newName });
    setEditingList(null);
    setEditName('');
    toast({
      title: "List updated",
      description: `List name has been updated to "${newName}".`,
    });
  };

  const getListStats = (list: any) => {
    const total = list.items.length;
    const completed = list.items.filter((item: any) => item.checked).length;
    return { total, completed };
  };

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      {/* Header */}
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Lists</h1>
          <Button
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setShowNewListDialog(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search lists..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Lists Content */}
      <div className="p-4">
        {filteredLists.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">
                {lists.length === 0 ? "No lists yet" : "No matching lists"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {lists.length === 0 
                  ? "Create your first shopping list to get started!" 
                  : `No lists match "${search}"`
                }
              </p>
              {lists.length === 0 && (
                <Button
                  onClick={() => setShowNewListDialog(true)}
                  className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First List
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredLists.map((list) => {
              const stats = getListStats(list);
              return (
                <Card key={list.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => navigate(`/list/${list.id}`)}
                      >
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-lg mr-2">{list.name}</h3>
                          {list.shared && (
                            <Badge variant="secondary" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              Shared
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {list.lastUsed ? new Date(list.lastUsed).toLocaleDateString() : 'Never used'}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {stats.completed} of {stats.total} items completed
                          </span>
                          {stats.total > 0 && (
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-koffa-aqua-forest h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingList(list.id);
                            setEditName(list.name);
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />

      {/* New List Dialog */}
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="List name (e.g., Weekly Groceries)"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateList();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewListDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
              onClick={handleCreateList}
              disabled={!newListName.trim()}
            >
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit List Dialog */}
      <Dialog open={!!editingList} onOpenChange={() => setEditingList(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="List name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && editingList) {
                  handleEditList(editingList, editName);
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingList(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                if (editingList) {
                  const list = lists.find(l => l.id === editingList);
                  if (list) {
                    handleDeleteList(editingList, list.name);
                    setEditingList(null);
                  }
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button 
              className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
              onClick={() => editingList && handleEditList(editingList, editName)}
              disabled={!editName.trim()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lists;
