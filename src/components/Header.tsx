
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="py-4 px-6 bg-white/70 backdrop-blur-sm sticky top-0 z-10 border-b border-leaf-100">
      <div className="container max-w-6xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-leaf-600" />
          <span className="font-medium text-xl">PlantHealth</span>
        </a>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Plants Database</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
        </nav>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="hidden md:inline-flex border-leaf-200 hover:bg-leaf-50 hover:text-leaf-700">
            Sign In
          </Button>
          <Button className="bg-leaf-600 hover:bg-leaf-700 text-white">
            Create Account
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
