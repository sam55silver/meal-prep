import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { MealSize, MealInput, MealInputType, Ideas } from '@/lib/data';
import { useState } from 'react';
import MealIdeas from './mealIdeas';

interface MealProps {
  mealNumber: number;
  defaultStyle: string;
  defaultSize: MealSize;
  removeMealCallback: Function;
  mealId: number;
}

const fetchIdeas = async (input: MealInputType) => {
  try {
    const res = await fetch('http://localhost:8000/generate_ideas', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    data['selected'] = 0;
    return [data, false];
  } catch (err) {
    console.error('Error fetching meal ideas', err);
    return [null, true];
  }
};

export default function Meal(props: MealProps) {
  const [data, setData] = useState<Ideas | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<MealInputType>({
    resolver: zodResolver(MealInput),
    defaultValues: {
      style: props.defaultStyle,
      size: props.defaultSize,
      extras: '',
    },
  });

  const onSubmit = async (values: MealInputType) => {
    setIsLoading(true);
    const [data, isError] = await fetchIdeas(values);
    setData(data);
    setIsError(isError);
    setIsLoading(false);
  };

  const setSelected = (id: number) => {
    if (data == null) return;
    setData({ ideas: data.ideas, selected: id });
  };

  const removeMeal = () => {
    props.removeMealCallback(props.mealId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal #{props.mealNumber + 1}</CardTitle>
        <CardDescription>Customize your meal!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="foodForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style</FormLabel>
                    <FormControl>
                      <Input placeholder="Meal Style" {...field} />
                    </FormControl>
                    <FormDescription>
                      The kind of meal you would like to have
                    </FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Meal Sizes</SelectLabel>
                          {Object.values(MealSize).map((size, i) => (
                            <SelectItem key={i} value={size}>
                              {size}
                            </SelectItem>
                          ))}
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
                    <Textarea
                      placeholder="Any extra ideas for your meal?"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Cater the meal to your needs!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {isLoading && <p>Loading...</p>}
              {isError && <p>Error!</p>}
              {!isError && !isLoading && data && (
                <MealIdeas data={data} selectCallback={setSelected} />
              )}
            </div>
            <div className="space-x-4">
              <Button type="submit">
                {data == null ? 'Generate Ideas' : 'Refresh Ideas'}
              </Button>
              <Button type="button" onClick={removeMeal} variant="destructive">
                Remove Meal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
