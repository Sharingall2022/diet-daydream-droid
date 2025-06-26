
import React, { useState } from 'react';
import { Calendar, ShoppingCart, ChefHat, List, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dietPlan, recipes, calculateCommonIngredients, calculateDayIngredients } from '@/data/dietData';

const DietApp = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [activeTab, setActiveTab] = useState('today');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const currentDayPlan = dietPlan.find(d => d.day === currentDay);
  const commonIngredients = calculateCommonIngredients();
  const todayIngredients = calculateDayIngredients(currentDay);

  const nextDay = () => {
    if (currentDay < 10) setCurrentDay(currentDay + 1);
  };

  const prevDay = () => {
    if (currentDay > 1) setCurrentDay(currentDay - 1);
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

  const MealCard = ({ meal }: { meal: any }) => (
    <Card className="mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
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
              className={`flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border border-gray-100/50 shadow-sm ${
                item.recipeId ? 'cursor-pointer hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-200 hover:shadow-md transform hover:scale-[1.02] transition-all duration-200' : ''
              }`}
              onClick={() => item.recipeId && openRecipe(item.recipeId)}
            >
              <span className={`font-semibold text-gray-800 ${item.recipeId ? 'text-emerald-700 hover:text-emerald-900' : ''}`}>
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

  const ShoppingListCard = ({ title, ingredients, icon }: { title: string, ingredients: Map<string, number>, icon: React.ReactNode }) => (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
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
            <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-xl border border-gray-100/50 shadow-sm hover:shadow-md hover:from-indigo-50 hover:to-purple-50/50 transition-all duration-200">
              <span className="font-semibold text-gray-800">{ingredient}</span>
              <span className="text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold shadow-sm">
                {quantity}g
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const RecipeModal = ({ recipe }: { recipe: any }) => (
    <Card className="mb-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">{recipe.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
              Ingredienti:
            </h4>
            <div className="space-y-3">
              {recipe.ingredients.map((ing: any, index: number) => (
                <div key={index} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-rose-50/50 p-4 rounded-xl border border-gray-100/50 shadow-sm">
                  <span className="font-medium text-gray-800">{ing.name}</span>
                  <span className="font-bold text-rose-600 bg-rose-100 px-4 py-2 rounded-full shadow-sm">
                    {ing.quantity}{ing.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {recipe.instructions && (
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                <div className="w-2 h-6 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
                Preparazione:
              </h4>
              <div className="bg-gradient-to-r from-gray-50 to-rose-50/30 p-6 rounded-xl border border-gray-100/50 leading-relaxed text-gray-700 shadow-sm">
                {recipe.instructions}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 via-pink-50 to-rose-100">
      {/* Recipe Modal Overlay */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
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
                  <h4 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-3">
                    <div className="w-3 h-8 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
                    Ingredienti:
                  </h4>
                  <div className="space-y-3">
                    {selectedRecipe.ingredients.map((ing: any, index: number) => (
                      <div key={index} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-rose-50/50 p-4 rounded-xl border border-gray-100/50 shadow-sm">
                        <span className="font-semibold text-gray-800">{ing.name}</span>
                        <span className="font-bold text-rose-600 bg-rose-100 px-4 py-2 rounded-full shadow-sm">
                          {ing.quantity}{ing.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedRecipe.instructions && (
                  <div>
                    <h4 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-3">
                      <div className="w-3 h-8 bg-gradient-to-b from-rose-400 to-pink-500 rounded-full"></div>
                      Preparazione:
                    </h4>
                    <div className="bg-gradient-to-r from-gray-50 to-rose-50/30 p-6 rounded-xl border border-gray-100/50 leading-relaxed text-gray-700 shadow-sm text-lg">
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
          <h1 className="text-4xl font-bold text-center mb-6 drop-shadow-lg">La Mia Dieta</h1>
          
          {/* Day Navigation */}
          <div className="flex justify-between items-center max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <Button 
              onClick={prevDay} 
              disabled={currentDay === 1}
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 disabled:opacity-50 rounded-full p-3 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">Giorno {currentDay}</div>
              <div className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">{currentDay}/10</div>
            </div>
            
            <Button 
              onClick={nextDay} 
              disabled={currentDay === 10}
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 disabled:opacity-50 rounded-full p-3 transition-all duration-200"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0 h-auto rounded-2xl p-2">
            <TabsTrigger value="today" className="flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-200 data-[state=active]:shadow-lg">
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span>Oggi</span>
            </TabsTrigger>
            <TabsTrigger value="weekly-shopping" className="flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200 data-[state=active]:shadow-lg">
              <ShoppingCart className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">Settimanale</span>
              <span className="sm:hidden">Sett.</span>
            </TabsTrigger>
            <TabsTrigger value="daily-shopping" className="flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200 data-[state=active]:shadow-lg">
              <List className="w-5 h-5 flex-shrink-0" />
              <span className="hidden sm:inline">Giornaliera</span>
              <span className="sm:hidden">Giorn.</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex flex-col items-center gap-2 p-4 text-sm sm:flex-row sm:gap-3 sm:text-base rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-200 data-[state=active]:shadow-lg">
              <ChefHat className="w-5 h-5 flex-shrink-0" />
              <span>Ricette</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6 animate-in fade-in duration-500">
            {currentDayPlan ? (
              <div>
                <div className="text-center mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-0">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentDayPlan.title}</h2>
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
              <div className="text-center text-gray-500 py-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
                <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Piano del giorno non disponibile</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="weekly-shopping" className="animate-in fade-in duration-500">
            <ShoppingListCard 
              title="Lista Spesa Settimanale (Ingredienti Comuni)"
              ingredients={commonIngredients}
              icon={<ShoppingCart className="w-6 h-6" />}
            />
          </TabsContent>

          <TabsContent value="daily-shopping" className="animate-in fade-in duration-500">
            <ShoppingListCard 
              title={`Lista Spesa Giorno ${currentDay}`}
              ingredients={todayIngredients}
              icon={<List className="w-6 h-6" />}
            />
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6 animate-in fade-in duration-500">
            {recipes.map((recipe, index) => (
              <RecipeModal key={index} recipe={recipe} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DietApp;
