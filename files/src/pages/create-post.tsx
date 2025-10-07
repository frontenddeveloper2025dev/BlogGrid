import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPostSchema, InsertPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { renderMarkdown } from "@/lib/markdown";
import PostEditor from "@/components/post-editor";
import { Save, Eye, Upload } from "lucide-react";

const categories = [
  "Technology",
  "Design", 
  "Productivity",
  "Learning",
  "Lifestyle",
  "Mobile"
];

export default function CreatePost() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("write");
  const [featuredImage, setFeaturedImage] = useState("");
  const { toast } = useToast();

  const form = useForm<InsertPost>({
    resolver: zodResolver(insertPostSchema.extend({
      excerpt: insertPostSchema.shape.excerpt.min(1, "Excerpt is required"),
    })),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      featuredImage: "",
      authorName: "John Doe",
      authorTitle: "Writer",
      authorAvatar: "",
      readTime: "5 min read",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: (data: InsertPost) => apiRequest("POST", "/api/posts", data),
    onSuccess: (response) => {
      toast({
        title: "Post created",
        description: "Your post has been published successfully.",
      });
      response.json().then((post) => {
        setLocation(`/post/${post.id}`);
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    },
    onSuccess: (data) => {
      setFeaturedImage(data.url);
      form.setValue('featuredImage', data.url);
      toast({
        title: "Image uploaded",
        description: "Featured image has been uploaded successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageMutation.mutate(file);
    }
  };

  const onSubmit = (data: InsertPost) => {
    createPostMutation.mutate({
      ...data,
      featuredImage: featuredImage || undefined,
    });
  };

  const content = form.watch("content");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Create New Post</h1>
        <p className="text-secondary">Share your thoughts and ideas with the world.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar with metadata */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of your post..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Featured Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
                      {featuredImage ? (
                        <div className="space-y-4">
                          <img 
                            src={featuredImage} 
                            alt="Featured"
                            className="w-full h-32 object-cover rounded"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setFeaturedImage("");
                              form.setValue('featuredImage', "");
                            }}
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-secondary mb-3 mx-auto" />
                          <p className="text-secondary">Drop image here or click to upload</p>
                          <p className="text-xs text-secondary mt-1">PNG, JPG up to 10MB</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-2"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            disabled={uploadImageMutation.isPending}
                          >
                            {uploadImageMutation.isPending ? "Uploading..." : "Choose File"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-white hover:bg-blue-600"
                      disabled={createPostMutation.isPending}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {createPostMutation.isPending ? "Publishing..." : "Publish Post"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveTab("preview")}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main editor area */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="border-b px-6 py-0">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="write" className="p-6 m-0">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <PostEditor
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Start writing your post... You can use Markdown syntax for formatting."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="preview" className="p-6 m-0">
                      <div className="min-h-[400px]">
                        {content ? (
                          <div 
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                          />
                        ) : (
                          <p className="text-secondary italic">Start writing to see a preview...</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
