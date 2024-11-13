import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectLabel, SelectItem } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'

import { MealInput, MealSize, MealInputType } from "~/lib/data"

import { api } from "~/trpc/react"

interface MealProps {
  mealNumber: number,
  defaultStyle: string,
  defaultSize: MealSize
}

export default function Meal(props: MealProps) {
  const form = useForm<MealInputType>({
    resolver: zodResolver(MealInput),
    defaultValues: {
      style: props.defaultStyle,
      size: props.defaultSize,
      extras: ""
    }
  })

  const onSubmit = async (values: MealInputType) => {
    console.log("Submitting meal ideas with:", values)
    const res = api.meal.generateIdeas.useQuery(values)
    console.log(res)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal #{props.mealNumber}</CardTitle>
        <CardDescription>Customize your meal!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style</FormLabel>
                    <FormControl>
                      <Input placeholder='Meal Style' {...field} />
                    </FormControl>
                    <FormDescription>The kind of meal you would like to have</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Meal Sizes</SelectLabel>
                          {
                            Object.values(MealSize).map((size, i) => <SelectItem key={i} value={size}>{size}</SelectItem>)
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>The sizing of your meal</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="extras"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Prompt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any extra ideas for your meal?" {...field} />
                  </FormControl>
                  <FormDescription>Cater the meal to your needs!</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Generate Ideas</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
