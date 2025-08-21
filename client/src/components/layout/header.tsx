import { Link } from "wouter";
import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer hover:text-accent transition-colors">
                BlogSpace
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary hover:text-primary transition-colors">
              Home
            </Link>
            <a href="#" className="text-secondary hover:text-primary transition-colors">About</a>
            <a href="#" className="text-secondary hover:text-primary transition-colors">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/create">
              <Button className="bg-accent text-white hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <User className="w-6 h-6 text-secondary hover:text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
