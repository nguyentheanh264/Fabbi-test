export type AutocompleteOption = {
  value: number | string;
  label: string;
};

type Dishes = {
  dish: AutocompleteOption | null;
  no: number;
};

export type RequestBodyOrder = {
  mealCategory: AutocompleteOption | null;
  restaurant: AutocompleteOption | null;
  noOfPeople: number;
  dishesConfig: Dishes[];
};
