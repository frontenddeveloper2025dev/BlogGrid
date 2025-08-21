import { type Post, type InsertPost, type Comment, type InsertComment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Posts
  getAllPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;
  likePost(id: string): Promise<Post | undefined>;
  
  // Comments
  getCommentsByPostId(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  likeComment(id: string): Promise<Comment | undefined>;
}

export class MemStorage implements IStorage {
  private posts: Map<string, Post>;
  private comments: Map<string, Comment>;

  constructor() {
    this.posts = new Map();
    this.comments = new Map();
  }

  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const now = new Date();
    const post: Post = {
      title: insertPost.title,
      content: insertPost.content,
      excerpt: insertPost.excerpt,
      category: insertPost.category,
      featuredImage: insertPost.featuredImage || null,
      authorName: insertPost.authorName || "John Doe",
      authorTitle: insertPost.authorTitle || "Writer", 
      authorAvatar: insertPost.authorAvatar || null,
      readTime: insertPost.readTime || "5 min read",
      id,
      likes: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: string, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost: Post = {
      ...post,
      ...updateData,
      updatedAt: new Date(),
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  async likePost(id: string): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost: Post = {
      ...post,
      likes: post.likes + 1,
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = {
      ...insertComment,
      id,
      authorAvatar: insertComment.authorAvatar || null,
      likes: 0,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    return comment;
  }

  async likeComment(id: string): Promise<Comment | undefined> {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    
    const updatedComment: Comment = {
      ...comment,
      likes: comment.likes + 1,
    };
    this.comments.set(id, updatedComment);
    return updatedComment;
  }
}

export const storage = new MemStorage();
