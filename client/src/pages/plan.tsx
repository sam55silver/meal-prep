import { Button } from '@/components/ui/button';
import { ChangeEvent, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const socketUrl =
  (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : '') +
  '/chat';

function PlanChat() {
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (_closeEvent: any) => true,
  });

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (lastMessage !== null) {
      const message: any = JSON.parse(lastMessage.data);
      setMessages([...messages, message.message]);
    }
  }, [lastMessage]);

  // TODO: setup so error happens if user trys to send and is disconnectd from server
  const sendMsg = (message: string) => {
    sendJsonMessage({ message });
  };

  const submitPrompt = () => {
    sendMsg(input);
    setInput('');
  };

  const startingPrompts = [
    'The classic Breakfast, Lunch, Snack, and Dinner, all week.',
    'Make me one meal to have all week for lunch and dinner.',
    'Use my breakfast and snack from my last plan and make a new lunch and Dinner.',
  ];

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold">Start a Plan</h1>
      <p className="text-muted-foreground">
        How would you like to structure your meal plan?
      </p>
      <div className="flex-grow flex flex-col items-end gap-6 mt-8 overflow-auto">
        {messages.length === 0 ? (
          startingPrompts.map((prompt: string, i: number) => (
            <Button
              key={i}
              onClick={() => sendMsg(prompt)}
              className="shadow-md bg-muted hover:bg-gray-200 w-fit"
            >
              {prompt}
            </Button>
          ))
        ) : (
          <></>
        )}
        {messages.map((message: string, i: number) => (
          <p className="bg-muted w-fit text-sm p-4 rounded-lg" key={i}>
            {message}
          </p>
        ))}
      </div>
      <div className="w-full bg-muted rounded-lg p-4 flex flex-row gap-2 mt-8">
        <input
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Or, write out your meal plan here..."
          className="w-full bg-muted focus:outline-none"
        />
        <Button onClick={submitPrompt} className="w-fit ml-auto">
          Sumit
        </Button>
      </div>
    </div>
  );
}

export default PlanChat;
