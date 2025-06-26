export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
  alternativeUnit?: string;
  category?: 'verdure' | 'carne' | 'latticini' | 'cereali' | 'condimenti' | 'frutta' | 'altro';
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
    category?: 'verdure' | 'carne' | 'latticini' | 'cereali' | 'condimenti' | 'frutta' | 'altro';
  }>;
}

export interface DayPlan {
  day: number;
  title: string;
  meals: Meal[];
  totalOil: string;
  totalParmesan?: string;
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  category: string;
  checked: boolean;
}

export interface CategorizedIngredients {
  [key: string]: ShoppingItem[];
}

export const recipes: Recipe[] = [
  {
    id: "latte-macchiato",
    name: "LATTE P.S.MACCHIATO",
    ingredients: [
      { name: "LATTE PARZ.SCREMATO", quantity: "250", unit: "g", alternativeUnit: "250ml", category: "latticini" },
      { name: "CAFFE'", quantity: "50", unit: "g", alternativeUnit: "50ml", category: "altro" }
    ]
  },
  {
    id: "risotto-asparagi",
    name: "RISOTTO AGLI ASPARAGI",
    ingredients: [
      { name: "RISO BRILLATO", quantity: "110", unit: "g", category: "cereali" },
      { name: "ASPARAGI DI CAMPO", quantity: "220", unit: "g", category: "verdure" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "5", unit: "g", category: "condimenti" },
      { name: "CIPOLLE", quantity: "50", unit: "g", category: "verdure" },
      { name: "BRODO VEGETALE", quantity: "300", unit: "ml", alternativeUnit: "300g", category: "altro" }
    ],
    instructions: "METTERE IN UNA CASSERUOLA UN GOCCIO DI OLIO CON LA CIPOLLA TRITATA FINEMENTE, FAR IMBIONDIRE A PENTOLA COPERTA PER POCHI MINUTI. AGGIUNGERE LA PARTE VERDE DEGLI ASPARAGI TAGLIATI A PEZZETTI E FAR INSAPORIRE PER 5 MINUTI. VERSARE IL RISO E FARLO TOSTARE. UNIRE IL BRODO POCO ALLA VOLTA E PORTARE A COTTURA PER 20 MINUTI CIRCA."
  },
  {
    id: "tonno-griglia",
    name: "TONNO ALLA GRIGLIA",
    ingredients: [
      { name: "TONNO", quantity: "200", unit: "g", category: "carne" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "10", unit: "g", category: "condimenti" }
    ]
  },
  {
    id: "pasta-broccoli",
    name: "PASTA CON I BROCCOLI",
    ingredients: [
      { name: "PASTA ALIMENTARE", quantity: "120", unit: "g", category: "cereali" },
      { name: "BROCCOLO A TESTA", quantity: "70", unit: "g", category: "verdure" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "15", unit: "g", category: "condimenti" },
      { name: "PARMIGIANO", quantity: "5", unit: "g", category: "latticini" }
    ]
  },
  {
    id: "insalata-mista",
    name: "INSALATA MISTA",
    ingredients: [
      { name: "LATTUGA", quantity: "100", unit: "g", category: "verdure" },
      { name: "FINOCCHI", quantity: "30", unit: "g", category: "verdure" },
      { name: "POMODORI", quantity: "50", unit: "g", category: "verdure" },
      { name: "RAVANELLI", quantity: "10", unit: "g", category: "verdure" }
    ]
  },
  {
    id: "tagliata-rucola",
    name: "TAGLIATA CON RUCOLA",
    ingredients: [
      { name: "VITELLO MAGRO", quantity: "170", unit: "g", category: "carne" },
      { name: "RUCOLA", quantity: "100", unit: "g", category: "verdure" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "10", unit: "g", category: "condimenti" }
    ],
    instructions: "SU UNA GRIGLIA BEN CALDA CUOCERE AL SANGUE IL VITELLO DA ENTRAMBI I LATI PER ALCUNI MINUTI. A COTTURA TERMINATA TAGLIARLO A PEZZETTI E DISPORLO SU DI UN PIATTO DA PORTATA E CONDIRLO CON OLIO DI OLIVA. COSPARGERE POI LA RUCOLA."
  },
  {
    id: "fusilli-fave-piselli",
    name: "FUSILLI CON FAVE E PISELLI",
    ingredients: [
      { name: "PASTA ALIMENTARE", quantity: "100", unit: "g", category: "cereali" },
      { name: "PISELLI FRESCHI", quantity: "70", unit: "g", category: "verdure" },
      { name: "FAVE FRESCHE", quantity: "60", unit: "g", category: "verdure" },
      { name: "SCAROLA", quantity: "30", unit: "g", category: "verdure" },
      { name: "POMODORI SAN MARZANO", quantity: "50", unit: "g", category: "verdure" },
      { name: "CIPOLLOTTO", quantity: "20", unit: "g", category: "verdure" },
      { name: "PEPERONCINO", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "PARMIGIANO", quantity: "10", unit: "g", category: "latticini" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "15", unit: "g", category: "condimenti" }
    ],
    instructions: "AFFETTARE SOTTILMENTE IL CIPOLLOTTO, FARLO DORARE IN UN TEGAME CON UN GOCCIO DI OLIO, UNIRE QUINDI I PISELLI E LE FAVE E REGOLARE DI SALE E PEPERONCINO. AGGIUNGERE UN MESTOLO DI ACQUA E LASCIARE CUOCERE PER 10 MINUTI CIRCA. AGGIUNGERE LA SCAROLA TAGLIATA A PEZZETTI, I POMODORI PELATI E SMINUZZATI E CONTINUARE LA COTTURA PER ALTRI 10 MINUTI. FARE CUOCERE LA PASTA AL DENTE E CONDIRLA CON LE VERDURE APPENA COTTE E COSPARGERE DI PARMIGIANO."
  },
  {
    id: "piselli-lessati",
    name: "PISELLI LESSATI",
    ingredients: [
      { name: "PISELLI FRESCHI", quantity: "200", unit: "g", category: "verdure" }
    ]
  },
  {
    id: "spaghetti-pomodoro-basilico",
    name: "SPAGHETTI POMOD.E BASILICO",
    ingredients: [
      { name: "PASTA ALIMENTARE", quantity: "120", unit: "g", category: "cereali" },
      { name: "POMODORI PELATI", quantity: "145", unit: "g", category: "verdure" },
      { name: "BASILICO IN FOGLIE", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "CIPOLLE", quantity: "10", unit: "g", category: "verdure" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "15", unit: "g", category: "condimenti" },
      { name: "PARMIGIANO", quantity: "10", unit: "g", category: "latticini" }
    ]
  },
  {
    id: "insalata-verza-limone",
    name: "INSALATA DI VERZA CON LIMONE",
    ingredients: [
      { name: "CAVOLO VERZA", quantity: "100", unit: "g", category: "verdure" },
      { name: "SUCCO DI LIMONE", quantity: "5", unit: "g", alternativeUnit: "5ml", category: "frutta" }
    ]
  },
  {
    id: "melanzane-grigliate",
    name: "MELANZANE GRIGLIATE",
    ingredients: [
      { name: "MELANZANE", quantity: "150", unit: "g", category: "verdure" },
      { name: "SALE FINO", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "AGLIO FRESCO", quantity: "Q.B.", unit: "", category: "condimenti" }
    ]
  },
  {
    id: "riso-borlotti-trevigiana",
    name: "RISO CON BORLOTTI E TREVIGIANA",
    ingredients: [
      { name: "RISO BRILLATO", quantity: "80", unit: "g", category: "cereali" },
      { name: "FAGIOLI BORLOTTI FRESCHI", quantity: "40", unit: "g", category: "verdure" },
      { name: "TREVIGIANA", quantity: "75", unit: "g", category: "verdure" },
      { name: "CIPOLLE", quantity: "15", unit: "g", category: "verdure" },
      { name: "BRODO VEGETALE", quantity: "160", unit: "ml", alternativeUnit: "160g", category: "altro" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "10", unit: "g", category: "condimenti" },
      { name: "PARMIGIANO", quantity: "10", unit: "g", category: "latticini" }
    ],
    instructions: "LAVARE, ASCIUGARE E TAGLIARE A STRISCIOLINE LA TREVIGIANA. TRITARE FINEMENTE LA CIPOLLA E METTERLA IN UNA CASSERUOLA ANTIADERENTE CON I FAGIOLI, UN PIZZICO DI SALE, ACQUA A SUFFICIENZA E LASCIARE CUOCERE A FUOCO BASSO. FARE ASCIUGARE L'ACQUA DI COTTURA DEI FAGIOLI A FUOCO VIVACE, POI UNIRE IL RISO, L'INSALATA E PORTARE A COTTURA, DILUENDO POCO ALLA VOLTA IL BRODO BOLLENTE. A COTTURA ULTIMATA IL RISOTTO DOVRA' RISULTARE PIUTTOSTO MORBIDO. INCORPORARE IL PARMIGIANO E LASCIARE RIPOSARE PER UN PAIO DI MINUTI PRIMA DI SERVIRE."
  },
  {
    id: "insalata-verdure",
    name: "INSALATA DI VERDURE",
    ingredients: [
      { name: "RADICCHIO ROSSO", quantity: "45", unit: "g", category: "verdure" },
      { name: "INDIVIA BELGA", quantity: "75", unit: "g", category: "verdure" },
      { name: "SCAROLA", quantity: "80", unit: "g", category: "verdure" }
    ]
  },
  {
    id: "pasta-zucchine-zafferano",
    name: "PASTA ZUCCHINE E ZAFFERANO",
    ingredients: [
      { name: "PASTA ALIMENTARE", quantity: "120", unit: "g", category: "cereali" },
      { name: "ZUCCHINE VERDI", quantity: "120", unit: "g", category: "verdure" },
      { name: "ZAFFERANO", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "PARMIGIANO", quantity: "10", unit: "g", category: "latticini" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "10", unit: "g", category: "condimenti" }
    ],
    instructions: "IN UNA LARGA PADELLA DISPORRE UN GOCCIO DI OLIO E DISPORRE LE ZUCCHINE TAGLIATE A LISTELLE. LASCIARLE CUOCERE AGGIUNGENDO POCO SALE E ACQUA ALL'OCCORRENZA. POCHI MINUTI PRIMA DELLA FINE COTTURA UNIRE LO ZAFFERANO SCIOLTO IN ACQUA QUINDI MESCOLARE IL TUTTO. LESSARE LA PASTA AL DENTE E CONDIRLE CON IL SUGO PRONTO E PARMIGIANO."
  },
  {
    id: "salmone-ferri-limone",
    name: "SALMONE AI FERRI E LIMONE",
    ingredients: [
      { name: "SALMONE", quantity: "200", unit: "g", category: "carne" },
      { name: "SUCCO DI LIMONE", quantity: "10", unit: "g", alternativeUnit: "10ml", category: "frutta" }
    ]
  },
  {
    id: "trenette-pesto",
    name: "TRENETTE AL PESTO",
    ingredients: [
      { name: "TRENETTE", quantity: "120", unit: "g", category: "cereali" },
      { name: "PESTO ALLA GENOVESE", quantity: "35", unit: "g", category: "condimenti" }
    ]
  },
  {
    id: "insalata-asparagi",
    name: "INSALATA DI ASPARAGI",
    ingredients: [
      { name: "ASPARAGI DI CAMPO", quantity: "150", unit: "g", category: "verdure" },
      { name: "SUCCO DI LIMONE", quantity: "10", unit: "g", alternativeUnit: "10ml", category: "frutta" }
    ]
  },
  {
    id: "petto-pollo-limone",
    name: "PETTO DI POLLO AL LIMONE",
    ingredients: [
      { name: "PETTO DI POLLO", quantity: "200", unit: "g", category: "carne" },
      { name: "PREZZEMOLO", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "SUCCO DI LIMONE", quantity: "10", unit: "g", alternativeUnit: "10ml", category: "frutta" }
    ]
  },
  {
    id: "insalata-radicchio-rosso",
    name: "INSALATA DI RADICCHIO ROSSO",
    ingredients: [
      { name: "RADICCHIO ROSSO", quantity: "100", unit: "g", category: "verdure" },
      { name: "SUCCO DI LIMONE", quantity: "5", unit: "g", alternativeUnit: "5ml", category: "frutta" }
    ]
  },
  {
    id: "riso-verza",
    name: "RISO CON LA VERZA",
    ingredients: [
      { name: "RISO BRILLATO", quantity: "120", unit: "g", category: "cereali" },
      { name: "CAVOLO VERZA", quantity: "100", unit: "g", category: "verdure" },
      { name: "CAROTE", quantity: "25", unit: "g", category: "verdure" },
      { name: "SEDANO", quantity: "35", unit: "g", category: "verdure" },
      { name: "POMODORI", quantity: "50", unit: "g", category: "verdure" },
      { name: "BASILICO IN FOGLIE", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "15", unit: "g", category: "condimenti" }
    ],
    instructions: "STUFARE UN BATTUTO TRITATO FINEMENTE FORMATO DA UNA CAROTA E UNA COSTA DI SEDANO VERDE. TAGLIARE LA VERZA, UNIRLA AL BATTUTO, SALARE, MESCOLARE CON IL CUCCHIAIO DI LEGNO LASCIANDO A FUOCO BASSO CON IL COPERCHIO PER 10 MINUTI. TAGLIARE A CUBETTI MEZZO IL POMODORO, UNIRLO ALLA VERZA INSIEME A QUALCHE FOGLIA DI BASILICO. AGGIUNGERE TANTA ACQUA QUANTA SERVIRA' PER LESSARE IL RISO, CALCOLANDO CHE, A FINE COTTURA, RIMANGA MORBIDO SENZA ESSERE SCOLATO. BOLLIRE FINO A CHE LA VERZA COMINCERA' A SPAPPOLARSI. BUTTARE IL RISO, AGGIUSTARE DI SALE."
  },
  {
    id: "platessa-pizzaiola",
    name: "PLATESSA ALLA PIZZAIOLA",
    ingredients: [
      { name: "PLATESSA", quantity: "200", unit: "g", category: "carne" },
      { name: "POMODORI PELATI", quantity: "100", unit: "g", category: "verdure" },
      { name: "PREZZEMOLO", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "10", unit: "g", category: "condimenti" }
    ],
    instructions: "PULIRE E LAVARE LA PLATESSA, DOPODICHE' DISPORLA IN UNA CASSERUOLA, UNIRE I POMODORI PELATI, PREZZEMOLO E UN GOCCIO DI OLIO DI OLIVA. LASCIARE CUOCERE PER CIRCA 15 MINUTI AGGIUNGENDO ACQUA ALL' OCCORRENZA."
  },
  {
    id: "melanzane-grigliate-2",
    name: "MELANZANE GRIGLIATE",
    ingredients: [
      { name: "MELANZANE", quantity: "200", unit: "g", category: "verdure" },
      { name: "SALE FINO", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "AGLIO FRESCO", quantity: "Q.B.", unit: "", category: "condimenti" }
    ]
  },
  {
    id: "spaghetti-olive",
    name: "SPAGHETTI BIANCHI ALLE OLIVE",
    ingredients: [
      { name: "PASTA ALIMENTARE", quantity: "120", unit: "g", category: "cereali" },
      { name: "OLIVE NERE", quantity: "10", unit: "g", category: "condimenti" },
      { name: "OLIVE VERDI", quantity: "25", unit: "g", category: "condimenti" },
      { name: "PEPERONCINO", quantity: "Q.B.", unit: "", category: "condimenti" },
      { name: "OLIO EXTRAVERGINE DI OLIVA", quantity: "15", unit: "g", category: "condimenti" }
    ],
    instructions: "IN UNA CASSERUOLA METTERE UN GOCCIO DI OLIO CON LE OLIVE SNOCCIOLATE E TRITATE FINEMENTE. LASCIARE INSAPORIRE PER POCHISSIMI MINUTI QUINDI UNIRE UN PIZZICO DI PEPERONCINO. TERMINARE LA COTTURA QUINDI CONDIRE LA PASTA COTTA AL DENTE."
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
          { name: "BISCOTTI SECCHI", quantity: "40g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "RISOTTO AGLI ASPARAGI", recipeId: "risotto-asparagi" },
          { name: "CETRIOLI", quantity: "100g", category: "verdure" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "BANANE", quantity: "200g", category: "frutta" },
          { name: "VALERIANELLA", quantity: "100g", category: "verdure" },
          { name: "MELE", quantity: "180g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "TONNO ALLA GRIGLIA", recipeId: "tonno-griglia" },
          { name: "PANE INTEGRALE", quantity: "70g", category: "cereali" }
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
          { name: "MARMELLATA ALLA FRUTTA", quantity: "30g", category: "altro" },
          { name: "FETTE BISCOTTATE INTEGRALI", quantity: "24g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "PASTA CON I BROCCOLI", recipeId: "pasta-broccoli" },
          { name: "INSALATA MISTA", recipeId: "insalata-mista" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "KIWI", quantity: "180g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "TAGLIATA CON RUCOLA", recipeId: "tagliata-rucola" },
          { name: "PANE INTEGRALE", quantity: "80g", category: "cereali" },
          { name: "AGRETTI LESSATI", quantity: "150g", category: "verdure" },
          { name: "UVA", quantity: "180g", category: "frutta" }
        ]
      }
    ],
    totalOil: "35g",
    totalParmesan: "5g"
  },
  {
    day: 3,
    title: "Giorno 3",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "MARMELLATA ALLA FRUTTA", quantity: "30g", category: "altro" },
          { name: "FETTE BISCOTTATE INTEGRALI", quantity: "32g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "FUSILLI CON FAVE E PISELLI", recipeId: "fusilli-fave-piselli" },
          { name: "PISELLI LESSATI", recipeId: "piselli-lessati" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "KIWI", quantity: "180g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "PROSCIUTTO COTTO MAGRO", quantity: "100g", category: "carne" },
          { name: "PANE INTEGRALE", quantity: "90g", category: "cereali" },
          { name: "INSALATA DI INDIVIA BELGA", quantity: "150g", category: "verdure" },
          { name: "ANANAS AL NATURALE", quantity: "200g", category: "frutta" }
        ]
      }
    ],
    totalOil: "35g",
    totalParmesan: "10g"
  },
  {
    day: 4,
    title: "Giorno 4",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "MARMELLATA ALLA FRUTTA", quantity: "30g", category: "altro" },
          { name: "FETTE BISCOTTATE INTEGRALI", quantity: "24g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "SPAGHETTI POMOD.E BASILICO", recipeId: "spaghetti-pomodoro-basilico" },
          { name: "INSALATA DI VERZA CON LIMONE", recipeId: "insalata-verza-limone" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "KIWI", quantity: "180g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "ORATA ALLA GRIGLIA", quantity: "200g", category: "carne" },
          { name: "PANE INTEGRALE", quantity: "80g", category: "cereali" },
          { name: "MELANZANE GRIGLIATE", recipeId: "melanzane-grigliate" },
          { name: "PERE", quantity: "200g", category: "frutta" }
        ]
      }
    ],
    totalOil: "30g",
    totalParmesan: "10g"
  },
  {
    day: 5,
    title: "Giorno 5",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "BISCOTTI SECCHI", quantity: "40g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "RISO CON BORLOTTI E TREVIGIANA", recipeId: "riso-borlotti-trevigiana" },
          { name: "FAGIOLI BORLOTTI IN SCATOLA SCOLATI", quantity: "180g", category: "verdure" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "KIWI", quantity: "180g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "UOVO SODO", quantity: "120g", category: "carne" },
          { name: "PANE INTEGRALE", quantity: "90g", category: "cereali" },
          { name: "INSALATA DI VERDURE", recipeId: "insalata-verdure" },
          { name: "MELE", quantity: "180g", category: "frutta" }
        ]
      }
    ],
    totalOil: "25g",
    totalParmesan: "10g"
  },
  {
    day: 6,
    title: "Giorno 6",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "MARMELLATA ALLA FRUTTA", quantity: "30g", category: "altro" },
          { name: "FETTE BISCOTTATE INTEGRALI", quantity: "24g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "PASTA ZUCCHINE E ZAFFERANO", recipeId: "pasta-zucchine-zafferano" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "INSALATA DI POMODORI", quantity: "150g", category: "verdure" },
          { name: "KIWI", quantity: "180g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "SALMONE AI FERRI E LIMONE", recipeId: "salmone-ferri-limone" },
          { name: "PANE INTEGRALE", quantity: "100g", category: "cereali" },
          { name: "INSALATA MISTA", recipeId: "insalata-mista" },
          { name: "MELONE", quantity: "200g", category: "frutta" }
        ]
      }
    ],
    totalOil: "15g",
    totalParmesan: "10g"
  },
  {
    day: 7,
    title: "Giorno 7",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "BISCOTTI SECCHI", quantity: "40g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "TRENETTE AL PESTO", recipeId: "trenette-pesto" },
          { name: "INSALATA DI ASPARAGI", recipeId: "insalata-asparagi" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "MELONE", quantity: "200g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "PETTO DI POLLO AL LIMONE", recipeId: "petto-pollo-limone" },
          { name: "PANE INTEGRALE", quantity: "90g", category: "cereali" },
          { name: "INSALATA DI RADICCHIO ROSSO", recipeId: "insalata-radicchio-rosso" },
          { name: "UVA", quantity: "180g", category: "frutta" }
        ]
      }
    ],
    totalOil: "20g"
  },
  {
    day: 8,
    title: "Giorno 8",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "BISCOTTI SECCHI", quantity: "40g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "RISO CON LA VERZA", recipeId: "riso-verza" },
          { name: "INSALATA MISTA", recipeId: "insalata-mista" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "UVA", quantity: "200g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "PLATESSA ALLA PIZZAIOLA", recipeId: "platessa-pizzaiola" },
          { name: "PANE INTEGRALE", quantity: "80g", category: "cereali" },
          { name: "MELANZANE GRIGLIATE", recipeId: "melanzane-grigliate-2" },
          { name: "PERE", quantity: "180g", category: "frutta" }
        ]
      }
    ],
    totalOil: "40g"
  },
  {
    day: 9,
    title: "Giorno 9",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "BISCOTTI SECCHI", quantity: "40g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "FILETTO DI MANZO AI FERRI", quantity: "150g", category: "carne" },
          { name: "INSALATA MISTA", recipeId: "insalata-mista" },
          { name: "PANE INTEGRALE", quantity: "70g", category: "cereali" },
          { name: "MELE", quantity: "180g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "PIZZA MARGHERITA", quantity: "250g", category: "cereali" },
          { name: "CILIEGIE", quantity: "180g", category: "frutta" },
          { name: "INSALATA DI INDIVIA BELGA", quantity: "100g", category: "verdure" }
        ]
      }
    ],
    totalOil: "5g"
  },
  {
    day: 10,
    title: "Giorno 10",
    meals: [
      {
        type: "COLAZIONE",
        items: [
          { name: "LATTE P.S.MACCHIATO", recipeId: "latte-macchiato" },
          { name: "MARMELLATA ALLA FRUTTA", quantity: "30g", category: "altro" },
          { name: "FETTE BISCOTTATE INTEGRALI", quantity: "24g", category: "cereali" }
        ]
      },
      {
        type: "PRANZO",
        items: [
          { name: "SPAGHETTI BIANCHI ALLE OLIVE", recipeId: "spaghetti-olive" },
          { name: "CECI LESSATI", quantity: "100g", category: "verdure" },
          { name: "VINO ROSSO", quantity: "120g", category: "altro" },
          { name: "MELONE", quantity: "200g", category: "frutta" }
        ]
      },
      {
        type: "CENA",
        items: [
          { name: "RICOTTA VACCINA", quantity: "100g", category: "latticini" },
          { name: "PANE INTEGRALE", quantity: "80g", category: "cereali" },
          { name: "FINOCCHI CRUDI", quantity: "150g", category: "verdure" },
          { name: "CILIEGIE", quantity: "180g", category: "frutta" }
        ]
      }
    ],
    totalOil: "15g"
  }
];

// Categorie per l'organizzazione della spesa
export const categoryIcons = {
  verdure: "🥬",
  carne: "🥩", 
  latticini: "🥛",
  cereali: "🌾",
  condimenti: "🧄",
  frutta: "🍎",
  altro: "📦"
};

export const categoryColors = {
  verdure: "from-green-400 to-emerald-500",
  carne: "from-red-400 to-rose-500", 
  latticini: "from-blue-400 to-cyan-500",
  cereali: "from-yellow-400 to-amber-500",
  condimenti: "from-purple-400 to-violet-500",
  frutta: "from-orange-400 to-pink-500",
  altro: "from-gray-400 to-slate-500"
};

// Funzione per calcolare gli ingredienti comuni a più giorni (frequenza >= 2)
export const calculateCommonIngredients = (): Map<string, number> => {
  const ingredientsByDay = new Map<string, Set<number>>(); // ingrediente -> giorni in cui appare
  const ingredientTotals = new Map<string, number>(); // ingrediente -> quantità totale
  
  // Prima raccogliamo tutti gli ingredienti per ogni giorno
  dietPlan.forEach(day => {
    day.meals.forEach(meal => {
      meal.items.forEach(item => {
        if (item.recipeId) {
          const recipe = recipes.find(r => r.id === item.recipeId);
          if (recipe) {
            recipe.ingredients.forEach(ingredient => {
              // Teniamo traccia in quali giorni appare questo ingrediente
              if (!ingredientsByDay.has(ingredient.name)) {
                ingredientsByDay.set(ingredient.name, new Set());
              }
              ingredientsByDay.get(ingredient.name)!.add(day.day);
              
              // Sommiamo la quantità totale
              const quantity = parseFloat(ingredient.quantity);
              const current = ingredientTotals.get(ingredient.name) || 0;
              ingredientTotals.set(ingredient.name, current + quantity);
            });
          }
        }
      });
    });
  });
  
  // Filtriamo solo gli ingredienti che appaiono in almeno 2 giorni diversi
  const commonIngredients = new Map<string, number>();
  
  for (const [ingredient, days] of ingredientsByDay.entries()) {
    if (days.size >= 2) { // Appare in almeno 2 giorni
      const totalQuantity = ingredientTotals.get(ingredient) || 0;
      commonIngredients.set(ingredient, totalQuantity);
    }
  }
  
  return commonIngredients;
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

// Funzione per categorizzare gli ingredienti per la spesa intelligente
export const calculateCategorizedIngredients = (dayNumber: number): CategorizedIngredients => {
  const dayPlan = dietPlan.find(d => d.day === dayNumber);
  const categorized: CategorizedIngredients = {};
  
  if (!dayPlan) return categorized;
  
  dayPlan.meals.forEach(meal => {
    meal.items.forEach(item => {
      if (item.recipeId) {
        const recipe = recipes.find(r => r.id === item.recipeId);
        if (recipe) {
          recipe.ingredients.forEach(ingredient => {
            const category = ingredient.category || 'altro';
            if (!categorized[category]) {
              categorized[category] = [];
            }
            
            const existing = categorized[category].find(i => i.name === ingredient.name);
            const quantity = parseFloat(ingredient.quantity) || 0;
            
            if (existing) {
              existing.quantity += quantity;
            } else {
              categorized[category].push({
                name: ingredient.name,
                quantity: quantity,
                category: category,
                checked: false
              });
            }
          });
        }
      } else if (item.quantity) {
        const category = item.category || 'altro';
        if (!categorized[category]) {
          categorized[category] = [];
        }
        
        const existing = categorized[category].find(i => i.name === item.name);
        const quantity = parseFloat(item.quantity.replace(/[^\d.]/g, '')) || 0;
        
        if (existing) {
          existing.quantity += quantity;
        } else {
          categorized[category].push({
            name: item.name,
            quantity: quantity,
            category: category,
            checked: false
          });
        }
      }
    });
  });
  
  return categorized;
};