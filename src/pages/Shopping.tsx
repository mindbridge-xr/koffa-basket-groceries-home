import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Plus, 
  Filter, 
  MapPin, 
  Activity,
  Timer,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomGroceryListDialog } from '@/components/CustomGroceryListDialog';
import { SmartShoppingTile } from '@/components/SmartShoppingTile';
import { HealthTrackingDashboard } from '@/components/HealthTrackingDashboard';
import { useHealthTracking } from '@/hooks/useHealthTracking';
import { organizeSmartList, calculateShoppingRoute } from '@/utils/smartListOrganizer';
import { StoreSection } from '@/types/smartShopping';
import { cn } from '@/lib/utils';

export const Shopping: React.FC = () => {
  const { lists, toggleItemChecked } = useApp();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showCustomListDialog, setShowCustomListDialog] = useState(false);
  const [showHealthDashboard, setShowHealthDashboard] = useState(false);
  const [smartSections, setSmartSections] = useState<StoreSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const {
    isTracking,
    currentMetrics,
    startTracking,
    stopTracking,
    getWeeklyStats
  } = useHealthTracking();

  // Get active shopping lists (lists with uncompleted items)
  const activeShoppingLists = lists.filter(list => 
    list.items.some(item => !item.checked)
  );

  const selectedList = selectedListId ? lists.find(l => l.id === selectedListId) : null;

  useEffect(() => {
    if (selectedList) {
      const sections = organizeSmartList(selectedList.items);
      setSmartSections(sections);
      
      if (!isTracking) {
        startTracking(selectedList.id);
      }
    }
  }, [selectedList, startTracking, isTracking]);

  const getProgress = (list: any) => {
    if (list.items.length === 0) return 0;
    const completed = list.items.filter((item: any) => item.checked).length;
    return (completed / list.items.length) * 100;
  };

  const handleItemToggle = (itemId: string) => {
    if (selectedList) {
      toggleItemChecked(selectedList.id, itemId);
      
      // Update smart sections
      setSmartSections(prev => prev.map(section => ({
        ...section,
        items: section.items.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      })));
    }
  };

  const handleSectionComplete = (sectionId: string) => {
    setSmartSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, visited: true } : section
    ));
    
    const nextIncompleteSection = smartSections.findIndex(
      (section, index) => index > currentSectionIndex && !section.visited
    );
    
    if (nextIncompleteSection !== -1) {
      setCurrentSectionIndex(nextIncompleteSection);
    }
  };

  const handleShoppingComplete = () => {
    if (selectedList) {
      const completedItems = selectedList.items.filter(item => item.checked).length;
      const session = stopTracking(selectedList.id, completedItems, selectedList.items.length);
      
      if (session) {
        // Show completion celebration
        setShowHealthDashboard(true);
      }
    }
  };

  if (selectedList) {
    const pendingItems = selectedList.items.filter(item => !item.checked);
    const completedItems = selectedList.items.filter(item => item.checked);
    const progress = getProgress(selectedList);
    const currentSection = smartSections[currentSectionIndex];
    const weeklyStats = getWeeklyStats();

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
        {/* Enhanced Header */}
        <div className="bg-gradient-primary text-white mobile-padding">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setSelectedListId(null)}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHealthDashboard(!showHealthDashboard)}
                className={cn(
                  "text-white hover:bg-white/10 border border-white/20",
                  showHealthDashboard && "bg-white/20"
                )}
              >
                <Activity className="h-4 w-4 mr-1" />
                Health
              </Button>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium font-inter">Smart Shopping</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2 font-poppins">{selectedList.name}</h1>
          
          {/* Real-time metrics */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1 text-sm">
              <Activity className="h-4 w-4" />
              <span>{currentMetrics.steps} steps</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center space-x-1 text-sm">
              <Zap className="h-4 w-4" />
              <span>{currentMetrics.caloriesBurned} cal</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center space-x-1 text-sm">
              <Timer className="h-4 w-4" />
              <span>{currentMetrics.shoppingDuration}m</span>
            </div>
          </div>
          
          <div className="mb-6">
            <Progress 
              value={progress} 
              className="h-3 bg-white/20 [&>div]:bg-white" 
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-white/60 font-inter">{Math.round(progress)}% complete</span>
              <span className="text-xs text-white/60 font-inter">
                {pendingItems.length} items left
              </span>
            </div>
          </div>
          
          {/* Section navigation */}
          {currentSection && (
            <div className="bg-white/10 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{currentSection.icon}</span>
                  <div>
                    <h3 className="font-semibold">{currentSection.name}</h3>
                    <p className="text-xs text-white/80">
                      {currentSection.items.filter(item => !item.checked).length} items remaining
                    </p>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white">
                  Section {currentSectionIndex + 1}/{smartSections.length}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Health Dashboard */}
        {showHealthDashboard && (
          <div className="mobile-spacing py-4">
            <HealthTrackingDashboard
              metrics={currentMetrics}
              isTracking={isTracking}
              weeklyStats={weeklyStats}
            />
          </div>
        )}

        {/* Smart Shopping Sections */}
        <div className="mobile-spacing space-y-6 py-6">
          {smartSections.map((section, sectionIndex) => {
            const sectionPendingItems = section.items.filter(item => !item.checked);
            const sectionCompletedItems = section.items.filter(item => item.checked);
            const showSection = sectionIndex === currentSectionIndex || 
                              (showCompleted && sectionCompletedItems.length > 0) ||
                              sectionPendingItems.length > 0;

            if (!showSection) return null;

            return (
              <Card key={section.id} className={cn(
                "overflow-hidden transition-all duration-300",
                sectionIndex === currentSectionIndex ? "ring-2 ring-primary shadow-lg" : "shadow",
                section.visited && "bg-green-50 border-green-200"
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">{section.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg capitalize font-poppins">
                          {section.name}
                        </CardTitle>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>{section.items.length} items</span>
                          {section.visited && (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Visited
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {sectionIndex === currentSectionIndex && sectionPendingItems.length === 0 && (
                      <Button
                        onClick={() => handleSectionComplete(section.id)}
                        className="btn-primary"
                        size="sm"
                      >
                        Complete Section
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {/* Pending items */}
                  {sectionPendingItems.map(item => (
                    <SmartShoppingTile
                      key={item.id}
                      item={item}
                      onToggle={handleItemToggle}
                      showNutrition={true}
                    />
                  ))}
                  
                  {/* Completed items */}
                  {showCompleted && sectionCompletedItems.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Completed ({sectionCompletedItems.length})
                      </h4>
                      {sectionCompletedItems.map(item => (
                        <SmartShoppingTile
                          key={item.id}
                          item={item}
                          onToggle={handleItemToggle}
                          showNutrition={false}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Shopping Complete State */}
          {pendingItems.length === 0 && (
            <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-blue-50">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2 font-poppins">Shopping Complete!</h3>
              <p className="text-sm text-muted-foreground mb-6 font-inter">
                Great job! You've completed your shopping trip efficiently.
              </p>
              
              {/* Session Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentMetrics.steps}</div>
                  <div className="text-xs text-muted-foreground">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{currentMetrics.caloriesBurned}</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentMetrics.shoppingDuration}</div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
              </div>
              
              <div className="flex space-x-3 justify-center">
                <Button 
                  onClick={handleShoppingComplete}
                  className="btn-primary"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Full Report
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedListId(null)}
                >
                  Back to Lists
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Quick Actions Bar */}
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg border p-3 z-10">
          <div className="flex items-center justify-between">
            <Button
              variant={showCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {showCompleted ? "Hide" : "Show"} Completed
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span className="font-medium">{currentMetrics.steps} steps</span>
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      
      <div className="bg-gradient-primary text-white mobile-padding">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-poppins">Shopping Mode</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCustomListDialog(true)}
              className="text-white hover:bg-white/10 border border-white/20"
            >
              <Plus className="h-4 w-4 mr-1" />
              Custom List
            </Button>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-6 w-6" />
            </div>
          </div>
        </div>
        <p className="text-sm text-white/80 font-inter">Select a list to start shopping</p>
      </div>

      <div className="mobile-spacing py-6">
        {activeShoppingLists.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground font-poppins">Ready to Shop</h2>
            <div className="space-y-3">
              {activeShoppingLists.map(list => {
                const pendingCount = list.items.filter(item => !item.checked).length;
                const progress = getProgress(list);
                
                return (
                  <button
                    key={list.id} 
                    className="card-familyhub-hover p-4 active:scale-95 transition-transform w-full text-left"
                    onClick={() => setSelectedListId(list.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-foreground font-poppins">{list.name}</h3>
                      <Badge className="bg-primary text-white">
                        {pendingCount} items
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-inter">{Math.round(progress)}% complete</span>
                        <div className="flex items-center text-muted-foreground font-inter">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>~{Math.ceil(pendingCount * 1.5)} min</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="card-familyhub p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">No Active Shopping Lists</h3>
            <p className="text-sm text-muted-foreground mb-6 font-inter">
              All your lists are complete! Create a new list or add items to get started.
            </p>
            <Link to="/lists">
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Go to Lists
              </Button>
            </Link>
          </div>
        )}
      </div>

      <CustomGroceryListDialog 
        open={showCustomListDialog}
        onOpenChange={setShowCustomListDialog}
      />

      <BottomNav />
    </div>
  );
};

export default Shopping;
