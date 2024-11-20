import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Meal from '@/components/app/mealCreation';
import { MealSize } from '@/lib/data';

interface MealData {
  defaultStyle: string;
  defaultSize: MealSize;
  formData: any;
  id: number;
}

function CreateMeal() {
  const [meals, setMeals] = useState<MealData[]>([]);
  const [totalMeals, setTotalMeals] = useState(0);

  const createNewMeal = (
    defaultStyle: string,
    defaultSize: MealSize,
    mealId: number
  ) => {
    const meal: MealData = {
      defaultStyle,
      defaultSize,
      formData: null,
      id: mealId,
    };
    setMeals([...meals, meal]);
  };

  const startNewMeal = () => {
    console.log('new meal');
    setMeals([]);
    setTotalMeals(0);
    createNewMeal('breakfast', MealSize.Medium, 0);
  };

  const addNewMeal = () => {
    switch (meals.length) {
      case 1:
        createNewMeal('lunch', MealSize.Large, totalMeals + 1);
        break;
      case 3:
        createNewMeal('dinner', MealSize.Large, totalMeals + 1);
        break;
      default:
        createNewMeal('snack', MealSize.Small, totalMeals + 1);
        break;
    }
    setTotalMeals(totalMeals + 1);
  };

  const removeMealCallback = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  useEffect(() => console.log(meals), [meals]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Start a Plan</CardTitle>
          <CardDescription>
            Build your personalized weekly meal plan tailored to your
            nutritional goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row gap-4">
          <Button className="ml-auto" onClick={startNewMeal} variant="default">
            Create New
          </Button>
          <Button variant="secondary">Modify Existing</Button>
        </CardContent>
      </Card>
      {meals.map((meal: MealData, i: number) => (
        <Meal
          defaultSize={meal.defaultSize}
          defaultStyle={meal.defaultStyle}
          mealNumber={i}
          mealId={meal.id}
          key={meal.id}
          removeMealCallback={removeMealCallback}
        />
      ))}
      {meals.length != 0 ? (
        <div className="flex flex-row gap-4">
          <Button className="ml-auto" onClick={addNewMeal}>
            Add Meal
          </Button>
          <Button variant="secondary">Finish Plan</Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CreateMeal;
