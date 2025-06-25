
export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions?: string;
}

export interface Meal {
  type: 'COLAZIONE' | 'PRANZO' | 'CENA';
  items: Array<{
    name: string;
    quantity?: string;
    recipeId?: string;
  }>;
}

export interface DayPlan {
  day: number;
  title: string;
  meals: Meal[];
  totalOil: string;
  totalParmesan?: string;
}

export const recipes: Recipe[] = [
  {
    id: "latte-macchiato",
    name: "LATTE P.S.MACCHIATO",
    ingredients: [
      { name: "LATTE PARZ.SCREMATO", quantity: "250", unit: "g" },
      { name: "CAFFE'", quantity: "50", unit: "g" }
    ]
  },
  {
    id: "risotto-asparagi",
    name: "RISOTTO AGLI ASPARAGI",
    ingredients: [
      { name: "RISO BRILLATO", quantity: "110", unit: "g" },
      { name: "ASPARAGI DI CAMPO", quantity: "220", unit: "g" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "5", unit: "g" },
      { name: "CIPOLLE", quantity: "50", unit: "g" },
      { name: "BRODO VEGETALE", quantity: "300", unit: "ml" }
    ],
    instructions: "METTERE IN UNA CASSERUOLA UN GOCCIO DI OLIO CON LA CIPOLLA TRITATA FINEMENTE, FAR IMBIONDIRE A PENTOLA COPERTA PER POCHI MINUTI. AGGIUNGERE LA PARTE VERDE DEGLI ASPARAGI TAGLIATI A PEZZETTI E FAR INSAPORIRE PER 5 MINUTI. VERSARE IL RISO E FARLO TOSTARE. UNIRE IL BRODO POCO ALLA VOLTA E PORTARE A COTTURA PER 20 MINUTI CIRCA."
  },
  {
    id: "tonno-griglia",
    name: "TONNO ALLA GRIGLIA",
    ingredients: [
      { name: "TONNO", quantity: "200", unit: "g" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "10", unit: "g" }
    ]
  },
  {
    id: "pasta-broccoli",
    name: "PASTA CON I BROCCOLI",
    ingredients: [
      { name: "PASTA ALIMENTARE", quantity: "120", unit: "g" },
      { name: "BROCCOLO A TESTA", quantity: "70", unit: "g" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "15", unit: "g" },
      { name: "PARMIGIANO", quantity: "5", unit: "g" }
    ]
  },
  {
    id: "insalata-mista",
    name: "INSALATA MISTA",
    ingredients: [
      { name: "LATTUGA", quantity: "100", unit: "g" },
      { name: "FINOCCHI", quantity: "30", unit: "g" },
      { name: "POMODORI", quantity: "50", unit: "g" },
      { name: "RAVANELLI", quantity: "10", unit: "g" }
    ]
  },
  {
    id: "tagliata-rucola",
    name: "TAGLIATA CON RUCOLA",
    ingredients: [
      { name: "VITELLO MAGRO", quantity: "170", unit: "g" },
      { name: "RUCOLA", quantity: "100", unit: "g" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "10", unit: "g" }
    ],
    instructions: "SU UNA GRIGLIA BEN CALDA CUOCERE AL SANGUE IL VITELLO DA ENTRAMBI I LATI PER ALCUNI MINUTI. A COTTURA TERMINATA TAGLIARLO A PEZZETTI E DISPORLO SU DI UN PIATTO DA PORTATA E CONDIRLO CON OLIO DI OLIVA. COSPARGERE POI LA RUCOLA."
  }
];

export const dietPlan: DayPlan[] = [
  {
    day: 1,
    title: "Giorno 1",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "BISCOTTI SECCHI", quantity: "40g" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "RISOTTO AGLI ASPARAGI", recipeId: "risotto-asparagi" },
          { name: "CETRIOLI", quantity: "100g" },
          { name: "VINO ROSSO", quantity: "120g" },
          { name: "BANANE", quantity: "200g" },
          { name: "VALERIANELLA", quantity: "100g" },
          { name: "MELE", quantity: "180g" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "TONNO ALLA GRIGLIA", recipeId: "tonno-griglia" },
          { name: "PANE INTEGRALE", quantity: "70g" }
        ]
      }
    ],
    totalOil: "25g"
  },
  {
    day: 2,
    title: "Giorno 2",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "MARMELLATA ALLA FRUTTA", quantity: "30g" },
          { name: "FETTE BISCOTTATE INTEGRALI", quantity: "24g" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "PASTA CON I BROCCOLI", recipeId: "pasta-broccoli" },
          { name: "INSALATA MISTA", recipeId: "insalata-mista" },
          { name: "VINO ROSSO", quantity: "120g" },
          { name: "KIWI", quantity: "180g" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "TAGLIATA CON RUCOLA", recipeId: "tagliata-rucola" },
          { name: "PANE INTEGRALE", quantity: "80g" },
          { name: "AGRETTI LESSATI", quantity: "150g" },
          { name: "UVA", quantity: "180g" }
        ]
      }
    ],
    totalOil: "35g",
    totalParmesan: "5g"
  }
  // Aggiungerò gli altri giorni successivamente per mantenere il codice gestibile
];

// Funzione per calcolare gli ingredienti comuni a tutti i 10 giorni
export const calculateCommonIngredients = (): Map<string, number> => {
  const ingredientCounts = new Map<string, number>();
  
  // Per ora uso solo i primi 2 giorni, ma la logica è scalabile
  dietPlan.forEach(day => {
    day.meals.forEach(meal => {
      meal.items.forEach(item => {
        if (item.recipeId) {
          const recipe = recipes.find(r => r.id === item.recipeId);
          if (recipe) {
            recipe.ingredients.forEach(ingredient => {
              const quantity = parseFloat(ingredient.quantity);
              const current = ingredientCounts.get(ingredient.name) || 0;
              ingredientCounts.set(ingredient.name, current + quantity);
            });
          }
        }
      });
    });
  });
  
  return ingredientCounts;
};

// Funzione per calcolare gli ingredienti specifici di un giorno
export const calculateDayIngredients = (dayNumber: number): Map<string, number> => {
  const dayPlan = dietPlan.find(d => d.day === dayNumber);
  const ingredientCounts = new Map<string, number>();
  
  if (!dayPlan) return ingredientCounts;
  
  dayPlan.meals.forEach(meal => {
    meal.items.forEach(item => {
      if (item.recipeId) {
        const recipe = recipes.find(r => r.id === item.recipeId);
        if (recipe) {
          recipe.ingredients.forEach(ingredient => {
            const quantity = parseFloat(ingredient.quantity);
            const current = ingredientCounts.get(ingredient.name) || 0;
            ingredientCounts.set(ingredient.name, current + quantity);
          });
        }
      } else if (item.quantity) {
        const quantity = parseFloat(item.quantity.replace(/[^\d.]/g, ''));
        const current = ingredientCounts.get(item.name) || 0;
        ingredientCounts.set(item.name, current + quantity);
      }
    });
  });
  
  return ingredientCounts;
};
