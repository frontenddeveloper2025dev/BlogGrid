import { Twitter, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@shared/schema";

interface SocialShareProps {
  post: Post;
}

export default function SocialShare({ post }: SocialShareProps) {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);
  const shareText = encodeURIComponent(post.excerpt);

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex items-center space-x-4 pb-8 border-b border-gray-200">
      <span className="text-sm font-medium text-secondary">Share:</span>
      <Button 
        onClick={handleTwitterShare}
        className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        size="sm"
      >
        <Twitter className="w-4 h-4 mr-2" />
        Twitter
      </Button>
      <Button 
        onClick={handleFacebookShare}
        className="bg-blue-700 text-white hover:bg-blue-800 transition-colors"
        size="sm"
      >
        <Facebook className="w-4 h-4 mr-2" />
        Facebook
      </Button>
      <Button 
        onClick={handleLinkedInShare}
        className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        size="sm"
      >
        <Linkedin className="w-4 h-4 mr-2" />
        LinkedIn
      </Button>
    </div>
  );
}
