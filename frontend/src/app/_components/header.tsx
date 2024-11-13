import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "~/components/ui/separator";
import { User } from 'lucide-react'

export default function Header() {
  return (
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
  )
}
