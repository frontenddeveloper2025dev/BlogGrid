import { useQuery } from "@tanstack/react-query";
import { Post } from "@shared/schema";
import PostCard from "@/components/post-card";
import { Rocket, Book, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Welcome to My Blog
          </h2>
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Sharing thoughts, ideas, and stories about technology, design, and life. 
            Join me on this journey of discovery and learning.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-accent text-white hover:bg-blue-600 transition-colors">
              <Rocket className="w-4 h-4 mr-2" />
              Get Started
            </Button>
            <Button variant="outline" className="border-gray-300 text-secondary hover:bg-gray-50 transition-colors">
              <Book className="w-4 h-4 mr-2" />
              Read Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-primary">Recent Posts</h3>
            <button className="text-accent hover:text-blue-600 transition-colors flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-secondary text-lg mb-4">No posts yet</p>
              <Link href="/create">
                <Button className="bg-accent text-white hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
