import { Button } from '@/components/ui/button';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const socketUrl =
  (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : '') +
  '/chat';

function PlanChat() {
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (_closeEvent) => true,
  });

  const startingPrompts = [
    'The classic Breakfast, Lunch, Snack, and Dinner, all week.',
    'Make me one meal to have all week for lunch and dinner.',
    'Use my breakfast and snack from my last plan and make a new lunch and Dinner.',
  ];

  return (
    <div className="h-full relative">
      <h1 className="text-2xl font-bold">Start a Plan</h1>
      <p className="text-muted-foreground">
        How would you like to structure your meal plan?
      </p>
      <div className="flex flex-col items-end gap-6 mt-8">
        {startingPrompts.map((prompt: string, i: number) => (
          <Button
            key={i}
            className="shadow-md bg-muted hover:bg-gray-200 w-fit"
          >
            {prompt}
          </Button>
        ))}
      </div>
      <div className="w-full absolute bottom-0 bg-muted rounded-lg p-4 flex flex-row gap-2 mt-8">
        <input
          placeholder="Or, write out your meal plan here..."
          className="w-full bg-muted focus:outline-none"
        />
        <Button className="w-fit ml-auto">Sumit</Button>
      </div>
    </div>
  );
}

export default PlanChat;
