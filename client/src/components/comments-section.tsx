import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { User, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CommentsSectionProps {
  postId: string;
  comments: Comment[];
  isLoading: boolean;
}

export default function CommentsSection({ postId, comments, isLoading }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createCommentMutation = useMutation({
    mutationFn: (data: { authorName: string; content: string; postId: string }) =>
      apiRequest("POST", `/api/posts/${postId}/comments`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts", postId, "comments"] });
      setNewComment("");
      setAuthorName("");
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: (commentId: string) =>
      apiRequest("POST", `/api/comments/${commentId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts", postId, "comments"] });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both name and comment fields.",
        variant: "destructive",
      });
      return;
    }

    createCommentMutation.mutate({
      authorName: authorName.trim(),
      content: newComment.trim(),
      postId,
    });
  };

  const handleLikeComment = (commentId: string) => {
    likeCommentMutation.mutate(commentId);
  };

  if (isLoading) {
    return (
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Comments</h3>
        <span className="text-secondary">{comments.length} comments</span>
      </div>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-gray-500" />
          </div>
          <div className="flex-1 space-y-3">
            <Input
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full"
            />
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-secondary">Be respectful and constructive in your comments.</p>
              <Button 
                type="submit" 
                disabled={createCommentMutation.isPending}
                className="bg-accent text-white hover:bg-blue-600"
              >
                {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-secondary">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              {comment.authorAvatar ? (
                <img 
                  src={comment.authorAvatar} 
                  alt={comment.authorName}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="font-medium text-primary">{comment.authorName}</p>
                    <span className="text-xs text-secondary">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-secondary">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm text-secondary">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    disabled={likeCommentMutation.isPending}
                    className="hover:text-red-500 transition-colors flex items-center space-x-1"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Like ({comment.likes})</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
