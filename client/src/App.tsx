import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"

function App() {
  return (
    <div className="font-geist">
      <header className="mb-16">
        <div className="py-4 flex justify-between items-center container mx-auto">

          <h2 className="text-xl font-bold">MealPrep Pro</h2>
          <nav className="space-x-4">
            <Button variant="ghost">Create</Button>
            <Button variant="ghost">View</Button>
          </nav>
          <Avatar>
            <AvatarImage src="/profile-user.png" alt="User" />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
        </div>
        <Separator />
      </header>
      <main className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Start a Plan</CardTitle>
            <CardDescription>Build your personalized weekly meal plan tailored to your nutritional goals.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row gap-4">
            <Button variant="default">Create New</Button>
            <Button variant="secondary">Modify Existing</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default App