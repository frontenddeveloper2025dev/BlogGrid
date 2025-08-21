import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Post, Comment } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";
import CommentsSection from "@/components/comments-section";
import SocialShare from "@/components/social-share";
import { renderMarkdown } from "@/lib/markdown";

export default function PostPage() {
  const { id } = useParams();

  const { data: post, isLoading: postLoading } = useQuery<Post>({
    queryKey: ["/api/posts", id],
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: ["/api/posts", id, "comments"],
  });

  if (postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Post not found</h1>
          <p className="text-secondary">The post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const categoryColors = {
    Technology: "bg-accent/10 text-accent",
    Design: "bg-green-100 text-green-700",
    Productivity: "bg-purple-100 text-purple-700",
    Learning: "bg-orange-100 text-orange-700",
    Lifestyle: "bg-teal-100 text-teal-700",
    Mobile: "bg-indigo-100 text-indigo-700",
  };

  const categoryColorClass = categoryColors[post.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-700";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Post Header */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        {post.featuredImage && (
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        )}
        
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-6">
            <span className={`${categoryColorClass} px-4 py-2 rounded-full text-sm font-medium`}>
              {post.category}
            </span>
            <span className="text-secondary">{post.readTime}</span>
            <span className="text-secondary">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-8">
            {post.authorAvatar ? (
              <img 
                src={post.authorAvatar} 
                alt={post.authorName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <p className="font-medium text-primary">{post.authorName}</p>
              <p className="text-sm text-secondary">{post.authorTitle}</p>
            </div>
          </div>
          
          {/* Social Share Buttons */}
          <SocialShare post={post} />
          
          {/* Post Content */}
          <div 
            className="prose prose-lg max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>
      </article>
      
      {/* Comments Section */}
      <CommentsSection 
        postId={post.id} 
        comments={comments} 
        isLoading={commentsLoading} 
      />
    </div>
  );
}
