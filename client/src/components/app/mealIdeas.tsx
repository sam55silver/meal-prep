import { Ideas, MealIdea } from '@/lib/data';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

export default function MealIdeas(props: {
  data: Ideas;
  selectCallback: Function;
}) {
  return (
    <div className="space-y-8 mt-8">
      {props.data.ideas.map((idea: MealIdea, i: number) => {
        const selected = props.data.selected == i;
        return (
          <Card
            key={i}
            className={selected ? 'border-primary-foreground border-2' : ''}
          >
            <CardHeader>
              <h2 className="text-lg font-semibold">{idea.name}</h2>
            </CardHeader>
            <CardContent className="flex flex-col">
              <p className="text-muted-foreground">{idea.description}</p>
              <Button
                variant={selected ? 'secondary' : 'default'}
                className="ml-auto mt-4"
                disabled={selected}
                onClick={() => props.selectCallback(i)}
              >
                Select
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
