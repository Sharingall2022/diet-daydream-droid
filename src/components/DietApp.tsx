import React, { useState } from 'react';
import { Calendar, ShoppingCart, ChefHat, List, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dietPlan, recipes, calculateCommonIngredients, calculateDayIngredients } from '@/data/dietData';

const DietApp = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [activeTab, setActiveTab] = useState('today');

  const currentDayPlan = dietPlan.find(d => d.day === currentDay);
  const commonIngredients = calculateCommonIngredients();
  const todayIngredients = calculateDayIngredients(currentDay);

  const nextDay = () => {
    if (currentDay < 10) setCurrentDay(currentDay + 1);
  };

  const prevDay = () => {
    if (currentDay > 1) setCurrentDay(currentDay - 1);
  };

  const MealCard = ({ meal }: { meal: any }) => (
    <Card className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-green-700 flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          {meal.type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {meal.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg border border-green-100">
              <span className="font-medium text-gray-700">{item.name}</span>
              {item.quantity && (
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
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
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {Array.from(ingredients.entries()).map(([ingredient, quantity], index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
              <span className="font-medium text-gray-700">{ingredient}</span>
              <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                {quantity}g
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const RecipeModal = ({ recipe }: { recipe: any }) => (
    <Card className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-700">{recipe.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Ingredienti:</h4>
            <div className="space-y-1">
              {recipe.ingredients.map((ing: any, index: number) => (
                <div key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded border border-purple-100">
                  <span>{ing.name}</span>
                  <span className="font-semibold text-purple-600">{ing.quantity}{ing.unit}</span>
                </div>
              ))}
            </div>
          </div>
          {recipe.instructions && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Preparazione:</h4>
              <p className="text-sm text-gray-600 bg-white p-3 rounded border border-purple-100 leading-relaxed">
                {recipe.instructions}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">La Mia Dieta</h1>
        
        {/* Day Navigation */}
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button 
            onClick={prevDay} 
            disabled={currentDay === 1}
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <div className="text-lg font-semibold">Giorno {currentDay}</div>
            <div className="text-sm opacity-90">{currentDay}/10</div>
          </div>
          
          <Button 
            onClick={nextDay} 
            disabled={currentDay === 10}
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-md h-auto">
            <TabsTrigger value="today" className="flex flex-col items-center gap-1 p-2 text-xs sm:flex-row sm:gap-2 sm:text-sm">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Oggi</span>
              <span className="sm:hidden">Oggi</span>
            </TabsTrigger>
            <TabsTrigger value="weekly-shopping" className="flex flex-col items-center gap-1 p-2 text-xs sm:flex-row sm:gap-2 sm:text-sm">
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Settimanale</span>
              <span className="sm:hidden">Sett.</span>
            </TabsTrigger>
            <TabsTrigger value="daily-shopping" className="flex flex-col items-center gap-1 p-2 text-xs sm:flex-row sm:gap-2 sm:text-sm">
              <List className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Giornaliera</span>
              <span className="sm:hidden">Giorn.</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex flex-col items-center gap-1 p-2 text-xs sm:flex-row sm:gap-2 sm:text-sm">
              <ChefHat className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Ricette</span>
              <span className="sm:hidden">Ricette</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {currentDayPlan ? (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentDayPlan.title}</h2>
                  <div className="flex justify-center gap-4 text-sm">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      Olio totale: {currentDayPlan.totalOil}
                    </span>
                    {currentDayPlan.totalParmesan && (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
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
              <div className="text-center text-gray-500 py-8">
                Piano del giorno non disponibile
              </div>
            )}
          </TabsContent>

          <TabsContent value="weekly-shopping">
            <ShoppingListCard 
              title="Lista Spesa Settimanale (Ingredienti Comuni)"
              ingredients={commonIngredients}
              icon={<ShoppingCart className="w-5 h-5" />}
            />
          </TabsContent>

          <TabsContent value="daily-shopping">
            <ShoppingListCard 
              title={`Lista Spesa Giorno ${currentDay}`}
              ingredients={todayIngredients}
              icon={<List className="w-5 h-5" />}
            />
          </TabsContent>

          <TabsContent value="recipes" className="space-y-4">
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
