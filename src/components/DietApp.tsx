import React, { useState, useEffect } from 'react';
import { Calendar, ShoppingCart, ChefHat, List, ArrowLeft, ArrowRight, X, Sun, Moon, RotateCcw, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { dietPlan, recipes, calculateCommonIngredients, calculateDayIngredients, calculateCategorizedIngredients, categoryIcons, categoryColors } from '@/data/dietData';

const DietApp = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [activeTab, setActiveTab] = useState('today');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [shoppingItems, setShoppingItems] = useState<{[key: string]: boolean}>({});

  const currentDayPlan = dietPlan.find(d => d.day === currentDay);
  const commonIngredients = calculateCommonIngredients();
  const todayIngredients = calculateDayIngredients(currentDay);
  const categorizedIngredients = calculateCategorizedIngredients(currentDay);

  // Toggle tema scuro/chiaro
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Toggle giorno completato
  const toggleDayCompleted = (day: number) => {
    const newCompletedDays = new Set(completedDays);
    if (completedDays.has(day)) {
      newCompletedDays.delete(day);
    } else {
      newCompletedDays.add(day);
    }
    setCompletedDays(newCompletedDays);
  };

  // Reset al giorno 1
  const resetToDay1 = () => {
    setCurrentDay(1);
    setCompletedDays(new Set());
    setShoppingItems({});
  };

  // Auto-reset quando tutti i giorni sono completati
  useEffect(() => {
    if (completedDays.size === 10) {
      setTimeout(() => {
        resetToDay1();
      }, 2000); // Aspetta 2 secondi prima del reset
    }
  }, [completedDays]);

  const nextDay = () => {
    if (currentDay < 10) {
      setCurrentDay(currentDay + 1);
    } else {
      setCurrentDay(1); // Torna al giorno 1 se siamo al 10
    }
  };

  const prevDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    } else {
      setCurrentDay(10); // Vai al giorno 10 se siamo al 1
    }
  };

  const openRecipe = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
    }
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
  };

  const toggleShoppingItem = (itemKey: string) => {
    setShoppingItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const MealCard = ({ meal }: { meal: any }) => (
    <Card className={`mb-6 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            <ChefHat className="w-6 h-6" />
          </div>
          {meal.type}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {meal.items.map((item: any, index: number) => (
            <div 
              key={index} 
              className={`flex justify-between items-center p-4 rounded-xl border shadow-sm transition-all duration-200 ${
                item.recipeId 
                  ? `cursor-pointer hover:shadow-md transform hover:scale-[1.02] ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600 hover:from-emerald-700 hover:to-teal-700 hover:border-emerald-500' 
                        : 'bg-gradient-to-r from-gray-50 to-blue-50/50 border-gray-100/50 hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-200'
                    }` 
                  : isDarkMode 
                    ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600' 
                    : 'bg-gradient-to-r from-gray-50 to-blue-50/50 border-gray-100/50'
              }`}
              onClick={() => item.recipeId && openRecipe(item.recipeId)}
            >
              <span className={`font-semibold ${
                item.recipeId 
                  ? isDarkMode ? 'text-emerald-300 hover:text-emerald-100' : 'text-emerald-700 hover:text-emerald-900'
                  : isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {item.name}
              </span>
              {item.quantity && (
                <span className="text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-semibold shadow-sm">
                  {item.quantity}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const SmartShoppingListCard = ({ title, categorizedIngredients, icon }: { title: string, categorizedIngredients: any, icon: React.ReactNode }) => (
    <Card className={`backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {Object.entries(categorizedIngredients).map(([category, items]: [string, any]) => (
            <div key={category} className="space-y-3">
              <h4 className={`font-bold text-lg flex items-center gap-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <span className="text-2xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                <span className="capitalize">{category}</span>
                <div className={`h-1 flex-1 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-full`}></div>
              </h4>
              <div className="space-y-2 ml-8">
                {items.map((item: any, index: number) => {
                  const itemKey = `${category}-${item.name}-${currentDay}`;
                  const isChecked = shoppingItems[itemKey] || false;
                  
                  return (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                      isChecked 
                        ? isDarkMode ? 'bg-green-800/50 border-green-600' : 'bg-green-50 border-green-200'
                        : isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                    }`}>
                      <Checkbox 
                        checked={isChecked}
                        onCheckedChange={() => toggleShoppingItem(itemKey)}
                        className="w-5 h-5"
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className={`font-medium ${
                          isChecked 
                            ? isDarkMode ? 'text-green-300 line-through' : 'text-green-700 line-through'
                            : isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {item.name}
                        </span>
                        <span className={`text-sm px-3 py-1 rounded-full font-semibold shadow-sm ${
                          isChecked
                            ? 'bg-green-500 text-white'
                            : `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white`
                        }`}>
                          {item.quantity}g
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const ShoppingListCard = ({ title, ingredients, icon }: { title: string, ingredients: Map<string, number>, icon: React.ReactNode }) => (
    <Card className={`backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {Array.from(ingredients.entries()).map(([ingredient, quantity], index) => (
            <div key={index} className={`flex justify-between items-center p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600 hover:from-indigo-700 hover:to-purple-700' 
                : 'bg-gradient-to-r from-gray-50 to-indigo-50/30 border-gray-100/50 hover:from-indigo-50 hover:to-purple-50/50'
            }`}>
              <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{ingredient}</span>
              <span className="text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold shadow-sm">
                {quantity}g
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Days progress component
  const DaysProgress = () => (
    <div className={`mb-6 p-6 rounded-2xl shadow-xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Progressi Dieta ({completedDays.size}/10)
        </h3>
        <Button 
          onClick={resetToDay1}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
      
      <div className="grid grid-cols-5 gap-3">
        {Array.from({length: 10}, (_, i) => i + 1).map(day => {
          const isCompleted = completedDays.has(day);
          const isCurrent = day === currentDay;
          
          return (
            <div 
              key={day}
              onClick={() => toggleDayCompleted(day)}
              className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg scale-105' 
                  : isCurrent
                    ? isDarkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="font-bold">{day}</span>
              {isCompleted && (
                <Check className="absolute top-1 right-1 w-3 h-3" />
              )}
            </div>
          );
        })}
      </div>
      
      {completedDays.size === 10 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl text-center animate-pulse">
          🎉 Complimenti! Hai completato tutti i 10 giorni! Reset automatico in corso...
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-indigo-100 via-purple-50 via-pink-50 to-rose-100'
    }`}>
      {/* Recipe Modal Overlay */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className={`rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border animate-in zoom-in-95 duration-300 ${
            isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-white/20'
          }`}>
            <div className="sticky top-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white border-b p-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
              <Button 
                onClick={closeRecipe}
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className={`font-bold mb-4 text-xl flex items-center gap-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    <div className="w-3 h-8 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
                    Ingredienti:
                  </h4>
                  <div className="space-y-3">
                    {selectedRecipe.ingredients.map((ing: any, index: number) => (
                      <div key={index} className={`flex justify-between items-center p-4 rounded-xl border shadow-sm ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-r from-gray-50 to-rose-50/50 border-gray-100/50'
                      }`}>
                        <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{ing.name}</span>
                        <span className="font-bold text-rose-600 bg-rose-100 px-4 py-2 rounded-full shadow-sm">
                          {ing.quantity}{ing.unit}
                          {ing.alternativeUnit && (
                            <span className="text-xs ml-1 opacity-75">({ing.alternativeUnit})</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedRecipe.instructions && (
                  <div>
                    <h4 className={`font-bold mb-4 text-xl flex items-center gap-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <div className="w-3 h-8 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
                      Preparazione:
                    </h4>
                    <div className={`p-6 rounded-xl border leading-relaxed shadow-sm text-lg ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-gradient-to-r from-gray-50 to-rose-50/30 border-gray-100/50 text-gray-700'
                    }`}>
                      {selectedRecipe.instructions}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold drop-shadow-lg">La Mia Dieta</h1>
            <Button 
              onClick={toggleTheme}
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </Button>
          </div>
          
          {/* Day Navigation */}
          <div className="flex justify-between items-center max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <Button 
              onClick={prevDay} 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">Giorno {currentDay}</div>
              <div className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">{currentDay}/10</div>
            </div>
            
            <Button 
              onClick={nextDay} 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <DaysProgress />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-4 mb-8 backdrop-blur-sm shadow-xl border-0 h-auto rounded-2xl p-2 ${
            isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
          }`}>
            <TabsTrigger value="today" className={`flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl transition-all duration-200 ${
              activeTab === 'today' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span>Oggi</span>
            </TabsTrigger>
            <TabsTrigger value="smart-shopping" className={`flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl transition-all duration-200 ${
              activeTab === 'smart-shopping' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <ShoppingCart className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">Smart Shopping</span>
              <span className="sm:hidden">Smart</span>
            </TabsTrigger>
            <TabsTrigger value="weekly-shopping" className={`flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl transition-all duration-200 ${
              activeTab === 'weekly-shopping' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <List className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">Settimanale</span>
              <span className="sm:hidden">Sett.</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className={`flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl transition-all duration-200 ${
              activeTab === 'recipes' 
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg' 
                : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <ChefHat className="w-5 h-5 flex-shrink-0" />
              <span>Ricette</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6 animate-in fade-in duration-500">
            {currentDayPlan ? (
              <div>
                <div className={`text-center mb-8 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-0 ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
                  <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{currentDayPlan.title}</h2>
                  <div className="flex justify-center gap-4 text-sm flex-wrap">
                    <span className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      Olio totale: {currentDayPlan.totalOil}
                    </span>
                    {currentDayPlan.totalParmesan && (
                      <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                        Parmigiano: {currentDayPlan.totalParmesan}
                      </span>
                    )}
                  </div>
                </div>
                
                {currentDayPlan.meals.map((meal, index) => (
                  <MealCard key={index} meal={meal} />
                ))}
              </div>
            ) : (
              <div className={`text-center py-12 backdrop-blur-sm rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800/90 text-gray-400' : 'bg-white/90 text-gray-500'}`}>
                <ChefHat className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className="text-lg">Piano del giorno non disponibile</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="smart-shopping" className="animate-in fade-in duration-500">
            <SmartShoppingListCard 
              title={`Lista Spesa Intelligente - Giorno ${currentDay}`}
              categorizedIngredients={categorizedIngredients}
              icon={<ShoppingCart className="w-6 h-6" />}
            />
          </TabsContent>

          <TabsContent value="weekly-shopping" className="animate-in fade-in duration-500">
            <ShoppingListCard 
              title="Lista Spesa Settimanale (Ingredienti Comuni)"
              ingredients={commonIngredients}
              icon={<List className="w-6 h-6" />}
            />
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6 animate-in fade-in duration-500">
            {recipes.map((recipe, index) => (
              <Card key={index} className={`mb-6 backdrop-blur-sm border-0 shadow-xl ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'}`}>
                <CardHeader className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold">{recipe.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className={`font-bold mb-4 text-lg flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        <div className="w-2 h-6 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
                        Ingredienti:
                      </h4>
                      <div className="space-y-3">
                        {recipe.ingredients.map((ing: any, index: number) => (
                          <div key={index} className={`flex justify-between items-center p-4 rounded-xl border shadow-sm ${
                            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-r from-gray-50 to-rose-50/50 border-gray-100/50'
                          }`}>
                            <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{ing.name}</span>
                            <span className="font-bold text-rose-600 bg-rose-100 px-4 py-2 rounded-full shadow-sm">
                              {ing.quantity}{ing.unit}
                              {ing.alternativeUnit && (
                                <span className="text-xs ml-1 opacity-75">({ing.alternativeUnit})</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {recipe.instructions && (
                      <div>
                        <h4 className={`font-bold mb-4 text-lg flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          <div className="w-2 h-6 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
                          Preparazione:
                        </h4>
                        <div className={`p-6 rounded-xl border leading-relaxed shadow-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200' 
                            : 'bg-gradient-to-r from-gray-50 to-rose-50/30 border-gray-100/50 text-gray-700'
                        }`}>
                          {recipe.instructions}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DietApp;