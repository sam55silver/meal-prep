"use client"

import { useState } from 'react'

import Meal from './_components/meal'
import { MealSize } from '~/lib/data'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MealData {
  defaultStyle: string,
  defaultSize: MealSize,
  formData: any,
}

export default function Home() {
  const [meals, setMeals] = useState<MealData[]>([])

  const createNewMeal = (defaultStyle: string, defaultSize: MealSize) => {
    const meal: MealData = {
      defaultStyle,
      defaultSize,
      formData: null,
    }
    setMeals([...meals, meal])
  }

  const startNewMeal = () => {
    setMeals([])
    createNewMeal("breakfast", MealSize.Medium)
  }

  return (
    <div>
      <main className="container mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Start a Plan</CardTitle>
            <CardDescription>Build your personalized weekly meal plan tailored to your nutritional goals.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row gap-4">
            <Button onClick={startNewMeal} variant="default">Create New</Button>
            <Button variant="secondary">Modify Existing</Button>
          </CardContent>
        </Card>
        {
          meals.map((meal: MealData, i: number) => (
            <Meal defaultSize={meal.defaultSize} defaultStyle={meal.defaultStyle} mealNumber={i} key={i} />
          ))
        }
      </main>
    </div>
  )
}
