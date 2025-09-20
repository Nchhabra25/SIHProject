import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  Trash2, 
  Edit, 
  MoreHorizontal,
  Clock,
  TrendingUp,
  Image as ImageIcon,
  Link as LinkIcon,
  Send,
  ChevronDown,
  ChevronUp,
  Reply,
  AlertTriangle,
  User,
  Calendar,
  Eye
} from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle, EcoCardDescription } from "@/components/ui/eco-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/auth";

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    title: "Amazing results from our tree planting campaign!",
    content: "Our school just completed a massive tree planting initiative. We planted over 200 saplings in our local park. The community response has been incredible!",
    author: "Sarah Chen",
    authorRole: "STUDENT",
    authorAvatar: "SC",
    timestamp: "2 hours ago",
    upvotes: 24,
    downvotes: 2,
    comments: 8,
    image: "/placeholder-tree.jpg",
    tags: ["Act", "Environment", "Community"],
    isUpvoted: false,
    isDownvoted: false
  },
  {
    id: 2,
    title: "Climate change research project ideas needed",
    content: "I'm working on a research project about renewable energy solutions for developing countries. Any suggestions for resources or case studies?",
    author: "Dr. Michael Rodriguez",
    authorRole: "TEACHER",
    authorAvatar: "MR",
    timestamp: "4 hours ago",
    upvotes: 18,
    downvotes: 1,
    comments: 12,
    tags: ["Learn", "Research", "Renewable Energy"],
    isUpvoted: true,
    isDownvoted: false
  },
  {
    id: 3,
    title: "Zero waste challenge - Week 2 update",
    content: "Successfully reduced my household waste by 60% this week! Here are some tips that worked for me: 1. Composting food scraps 2. Using reusable containers 3. Buying in bulk",
    author: "Alex Kumar",
    authorRole: "AMBASSADOR",
    authorAvatar: "AK",
    timestamp: "6 hours ago",
    upvotes: 31,
    downvotes: 0,
    comments: 15,
    tags: ["Act", "Zero Waste", "Tips"],
    isUpvoted: false,
    isDownvoted: false
  },
  {
    id: 4,
    title: "New environmental documentary recommendations",
    content: "Just watched 'Our Planet' on Netflix and it was incredible! What other environmental documentaries would you recommend for students?",
    author: "Emma Wilson",
    authorRole: "STUDENT",
    authorAvatar: "EW",
    timestamp: "1 day ago",
    upvotes: 15,
    downvotes: 1,
    comments: 6,
    tags: ["Learn", "Documentary", "Education"],
    isUpvoted: false,
    isDownvoted: false
  }
];

const mockComments = [
  {
    id: 1,
    postId: 1,
    content: "That's fantastic! How did you organize the logistics for 200 saplings?",
    author: "Dr. Michael Rodriguez",
    authorRole: "TEACHER",
    authorAvatar: "MR",
    timestamp: "1 hour ago",
    upvotes: 5,
    downvotes: 0,
    isUpvoted: false,
    isDownvoted: false,
    replies: [
      {
        id: 11,
        content: "We partnered with the local forestry department and got the saplings donated!",
        author: "Sarah Chen",
        authorRole: "STUDENT",
        authorAvatar: "SC",
        timestamp: "30 minutes ago",
        upvotes: 3,
        downvotes: 0,
        isUpvoted: false,
        isDownvoted: false
      }
    ]
  },
  {
    id: 2,
    postId: 1,
    content: "Great initiative! This is exactly the kind of action we need more of.",
    author: "Alex Kumar",
    authorRole: "AMBASSADOR",
    authorAvatar: "AK",
    timestamp: "45 minutes ago",
    upvotes: 8,
    downvotes: 0,
    isUpvoted: true,
    isDownvoted: false,
    replies: []
  }
];

export default function DiscussionBoard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [comments, setComments] = useState(mockComments);
  const [sortBy, setSortBy] = useState("recent");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
    link: "",
    tags: ""
  });
  const [newComment, setNewComment] = useState<{ [postId: number]: string }>({});
  const [newReply, setNewReply] = useState<{ [commentId: number]: string }>({});

  // Sort posts based on selected criteria
  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case "recent":
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const handleVote = (postId: number, type: 'upvote' | 'downvote') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasUpvoted = post.isUpvoted;
        const wasDownvoted = post.isDownvoted;
        
        let newUpvotes = post.upvotes;
        let newDownvotes = post.downvotes;
        let newIsUpvoted = false;
        let newIsDownvoted = false;

        if (type === 'upvote') {
          if (wasUpvoted) {
            newUpvotes--;
          } else {
            newUpvotes++;
            if (wasDownvoted) {
              newDownvotes--;
            }
            newIsUpvoted = true;
          }
        } else {
          if (wasDownvoted) {
            newDownvotes--;
          } else {
            newDownvotes++;
            if (wasUpvoted) {
              newUpvotes--;
            }
            newIsDownvoted = true;
          }
        }

        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          isUpvoted: newIsUpvoted,
          isDownvoted: newIsDownvoted
        };
      }
      return post;
    }));
  };

  const handleCommentVote = (commentId: number, type: 'upvote' | 'downvote') => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const wasUpvoted = comment.isUpvoted;
        const wasDownvoted = comment.isDownvoted;
        
        let newUpvotes = comment.upvotes;
        let newDownvotes = comment.downvotes;
        let newIsUpvoted = false;
        let newIsDownvoted = false;

        if (type === 'upvote') {
          if (wasUpvoted) {
            newUpvotes--;
          } else {
            newUpvotes++;
            if (wasDownvoted) {
              newDownvotes--;
            }
            newIsUpvoted = true;
          }
        } else {
          if (wasDownvoted) {
            newDownvotes--;
          } else {
            newDownvotes++;
            if (wasUpvoted) {
              newUpvotes--;
            }
            newIsDownvoted = true;
          }
        }

        return {
          ...comment,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          isUpvoted: newIsUpvoted,
          isDownvoted: newIsDownvoted
        };
      }
      return comment;
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Anonymous",
      authorRole: user?.role || "STUDENT",
      authorAvatar: user?.firstName?.charAt(0) + user?.lastName?.charAt(0) || "A",
      timestamp: "Just now",
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      image: newPost.image,
      link: newPost.link,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isUpvoted: false,
      isDownvoted: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", image: "", link: "", tags: "" });
    setShowCreatePost(false);
  };

  const handleAddComment = (postId: number) => {
    const content = newComment[postId];
    if (!content?.trim()) return;

    const comment = {
      id: Date.now(),
      postId,
      content,
      author: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Anonymous",
      authorRole: user?.role || "STUDENT",
      authorAvatar: user?.firstName?.charAt(0) + user?.lastName?.charAt(0) || "A",
      timestamp: "Just now",
      upvotes: 0,
      downvotes: 0,
      isUpvoted: false,
      isDownvoted: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment({ ...newComment, [postId]: "" });
    
    // Update post comment count
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  const handleAddReply = (commentId: number) => {
    const content = newReply[commentId];
    if (!content?.trim()) return;

    const reply = {
      id: Date.now(),
      content,
      author: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Anonymous",
      authorRole: user?.role || "STUDENT",
      authorAvatar: user?.firstName?.charAt(0) + user?.lastName?.charAt(0) || "A",
      timestamp: "Just now",
      upvotes: 0,
      downvotes: 0,
      isUpvoted: false,
      isDownvoted: false
    };

    setComments(comments.map(comment => 
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setNewReply({ ...newReply, [commentId]: "" });
  };

  const toggleComments = (postId: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedComments(newExpanded);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "STUDENT": return "bg-blue-100 text-blue-800";
      case "TEACHER": return "bg-green-100 text-green-800";
      case "AMBASSADOR": return "bg-purple-100 text-purple-800";
      case "ADMIN": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "STUDENT": return "🎓";
      case "TEACHER": return "👨‍🏫";
      case "AMBASSADOR": return "🌟";
      case "ADMIN": return "👑";
      default: return "👤";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-5">
        <Link to="/">
          <EcoButton variant="outline" size="lg">← Go Back Home</EcoButton>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discussion Board</h1>
          <p className="text-muted-foreground text-lg">
            Share ideas, ask questions, and collaborate with the EcoQuest community
          </p>
        </motion.div>

        {/* Create Post Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <EcoCard>
            <EcoCardHeader>
              <EcoCardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Start a Discussion</span>
              </EcoCardTitle>
            </EcoCardHeader>
            <EcoCardContent>
              <div className="space-y-4">
                <Input
                  placeholder="What's on your mind? (Post title)"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <Textarea
                  placeholder="Share your thoughts, questions, or ideas..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={3}
                />
                <div className="flex flex-wrap gap-2">
                  <Input
                    placeholder="Image URL (optional)"
                    value={newPost.image}
                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                    className="flex-1 min-w-48"
                  />
                  <Input
                    placeholder="Link URL (optional)"
                    value={newPost.link}
                    onChange={(e) => setNewPost({ ...newPost, link: e.target.value })}
                    className="flex-1 min-w-48"
                  />
                  <Input
                    placeholder="Tags (comma separated)"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    className="flex-1 min-w-48"
                  />
                </div>
                <div className="flex justify-end">
                  <EcoButton onClick={handleCreatePost} disabled={!newPost.title.trim() || !newPost.content.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </EcoButton>
                </div>
              </div>
            </EcoCardContent>
          </EcoCard>
        </motion.div>

        {/* Sort and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Most Recent</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="popular">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {posts.length} posts
            </div>
          </div>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-6">
          {sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EcoCard className="hover:shadow-md transition-shadow">
                <EcoCardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{post.authorAvatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{post.author}</span>
                          <Badge className={getRoleColor(post.authorRole)}>
                            {getRoleIcon(post.authorRole)} {post.authorRole}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <EcoButton variant="ghost" size="sm">
                            <Flag className="w-4 h-4" />
                          </EcoButton>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Report Content</DialogTitle>
                            <DialogDescription>
                              Help us keep the community safe by reporting inappropriate content.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="spam">Spam</SelectItem>
                                <SelectItem value="harassment">Harassment</SelectItem>
                                <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                                <SelectItem value="misinformation">Misinformation</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <Textarea placeholder="Additional details (optional)" />
                            <EcoButton className="w-full">Submit Report</EcoButton>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {(user?.email === post.author || user?.role === 'ADMIN') && (
                        <EcoButton variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </EcoButton>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.content}</p>
                    
                    {post.image && (
                      <div className="mb-4">
                        <img 
                          src={post.image} 
                          alt="Post image" 
                          className="max-w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    {post.link && (
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <LinkIcon className="w-4 h-4" />
                          <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {post.link}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <EcoButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(post.id, 'upvote')}
                          className={post.isUpvoted ? 'text-green-600' : ''}
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </EcoButton>
                        <span className="text-sm font-medium">{post.upvotes - post.downvotes}</span>
                        <EcoButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(post.id, 'downvote')}
                          className={post.isDownvoted ? 'text-red-600' : ''}
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </EcoButton>
                      </div>
                      <EcoButton
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleComments(post.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {post.comments} comments
                        {expandedComments.has(post.id) ? (
                          <ChevronUp className="w-4 h-4 ml-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-2" />
                        )}
                      </EcoButton>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 100) + 10} views</span>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {expandedComments.has(post.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t"
                      >
                        {/* Add Comment */}
                        <div className="mb-6">
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder="Add a comment..."
                                value={newComment[post.id] || ''}
                                onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                                rows={2}
                              />
                              <div className="flex justify-end mt-2">
                                <EcoButton
                                  size="sm"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!newComment[post.id]?.trim()}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Comment
                                </EcoButton>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4">
                          {comments.filter(comment => comment.postId === post.id).map((comment) => (
                            <div key={comment.id} className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>{comment.authorAvatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <Badge className={getRoleColor(comment.authorRole)}>
                                      {getRoleIcon(comment.authorRole)} {comment.authorRole}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                      <EcoButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleCommentVote(comment.id, 'upvote')}
                                        className={comment.isUpvoted ? 'text-green-600' : ''}
                                      >
                                        <ThumbsUp className="w-3 h-3" />
                                      </EcoButton>
                                      <span className="text-xs font-medium">{comment.upvotes - comment.downvotes}</span>
                                      <EcoButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleCommentVote(comment.id, 'downvote')}
                                        className={comment.isDownvoted ? 'text-red-600' : ''}
                                      >
                                        <ThumbsDown className="w-3 h-3" />
                                      </EcoButton>
                                    </div>
                                    <EcoButton variant="ghost" size="sm">
                                      <Reply className="w-3 h-3 mr-1" />
                                      Reply
                                    </EcoButton>
                                    {(user?.email === comment.author || user?.role === 'ADMIN') && (
                                      <EcoButton variant="ghost" size="sm" className="text-destructive">
                                        <Trash2 className="w-3 h-3" />
                                      </EcoButton>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Replies */}
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="ml-11 flex items-start space-x-3">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="text-xs">{reply.authorAvatar}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-xs">{reply.author}</span>
                                      <Badge className={`${getRoleColor(reply.authorRole)} text-xs`}>
                                        {getRoleIcon(reply.authorRole)} {reply.authorRole}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">{reply.content}</p>
                                    <div className="flex items-center space-x-2">
                                      <div className="flex items-center space-x-1">
                                        <EcoButton
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 px-2"
                                        >
                                          <ThumbsUp className="w-3 h-3" />
                                        </EcoButton>
                                        <span className="text-xs font-medium">{reply.upvotes - reply.downvotes}</span>
                                        <EcoButton
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 px-2"
                                        >
                                          <ThumbsDown className="w-3 h-3" />
                                        </EcoButton>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No discussions yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to start a conversation in the community!
            </p>
            <EcoButton onClick={() => setShowCreatePost(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </EcoButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}