import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">BlogSpace</h3>
            <p className="text-secondary mb-6 max-w-md">
              A modern platform for sharing thoughts, ideas, and stories. Built with passion for great content and beautiful design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">Home</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-primary mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">Technology</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">Design</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">Productivity</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition-colors">Learning</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-secondary">
            &copy; 2024 BlogSpace. All rights reserved. Made with ❤️ for writers and readers.
          </p>
        </div>
      </div>
    </footer>
  );
}
