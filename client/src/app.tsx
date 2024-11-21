import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlanChat from './pages/plan';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanChat />,
  },
]);

function App() {
  return (
    <div className="font-geist h-dvh flex flex-col">
      <header>
        <div className="py-4 flex justify-between items-center container mx-auto px-4">
          <h2 className="text-xl font-bold">Egg Agent</h2>
          <nav className="space-x-4">
            <Button variant="ghost">Create</Button>
            <Button variant="ghost">View</Button>
          </nav>
          <Avatar>
            <AvatarImage src="/profile-user.png" alt="User" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
        <Separator />
      </header>
      <main className="flex-grow h-full container mx-auto p-8">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
