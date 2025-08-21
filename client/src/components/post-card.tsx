import { Link } from "wouter";
import { Heart, Clock, User } from "lucide-react";
import { Post } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface PostCardProps {
  post: Post;
}

const categoryColors = {
  Technology: "bg-accent/10 text-accent",
  Design: "bg-green-100 text-green-700",
  Productivity: "bg-purple-100 text-purple-700",
  Learning: "bg-orange-100 text-orange-700",
  Lifestyle: "bg-teal-100 text-teal-700",
  Mobile: "bg-indigo-100 text-indigo-700",
};

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/posts/${post.id}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    likeMutation.mutate();
  };

  const categoryColorClass = categoryColors[post.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-700";

  return (
    <Link href={`/post/${post.id}`}>
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-200 overflow-hidden cursor-pointer">
        {post.featuredImage && (
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className={`${categoryColorClass} px-3 py-1 rounded-full text-sm font-medium`}>
              {post.category}
            </span>
            <span className="text-xs text-secondary flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime}
            </span>
          </div>
          <h4 className="text-xl font-semibold text-primary mb-3 hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-secondary mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {post.authorAvatar ? (
                <img 
                  src={post.authorAvatar} 
                  alt={post.authorName}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-primary">{post.authorName}</p>
                <p className="text-xs text-secondary">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            <button
              onClick={handleLike}
              disabled={likeMutation.isPending}
              className="flex items-center space-x-2 text-secondary hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.likes}</span>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
