'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Trophy,
  Flame,
  Award,
  Heart,
  Send,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { initialChallenges, initialCommunityPosts } from '@/lib/mockData';
import { CommunityPost, FitnessChallenge } from '@/lib/types';

export default function CommunityPage() {
  const { user, showToast } = useApp();
  const [challenges, setChallenges] = useState<FitnessChallenge[]>(initialChallenges);
  const [posts, setPosts] = useState<CommunityPost[]>(initialCommunityPosts);
  const [newPostText, setNewPostText] = useState('');
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});

  const handleToggleJoinChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const joined = !c.joined;
          showToast({
            type: joined ? 'success' : 'info',
            title: joined ? 'Challenge Joined! 🎯' : 'Challenge Left',
            message: joined
              ? `You are now competing in "${c.title}". Target: ${c.targetMetric}!`
              : `Withdrew from "${c.title}".`
          });
          return {
            ...c,
            joined,
            participantsCount: joined ? c.participantsCount + 1 : c.participantsCount - 1
          };
        }
        return c;
      })
    );
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const liked = !p.likedByMe;
          return {
            ...p,
            likedByMe: liked,
            likes: liked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const created: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorRole: `${user.membershipTier} Member`,
      authorAvatar: user.avatar,
      timeAgo: 'Just now',
      content: newPostText,
      tag: '#FitSphereClub',
      likes: 1,
      likedByMe: true,
      comments: []
    };

    setPosts([created, ...posts]);
    setNewPostText('');
    showToast({
      type: 'success',
      title: 'Shared to Club Feed',
      message: 'Your workout achievement is now live to fellow members!'
    });
  };

  const handleAddComment = (postId: string) => {
    const text = newCommentText[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c-${Date.now()}`,
                author: user.name,
                text: text.trim(),
                timeAgo: 'Just now'
              }
            ]
          };
        }
        return p;
      })
    );

    setNewCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Club Social & Accountability Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Community & Fitness Challenges
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Compete in weekly gym challenges, celebrate PR achievements, and connect with fitness enthusiasts in your city.
          </p>
        </div>
      </div>

      {/* Fitness Challenges Banner */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Active Club Challenges</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((ch) => (
            <div
              key={ch.id}
              className={`rounded-2xl p-5 flex flex-col justify-between border transition-all ${
                ch.joined
                  ? 'bg-zinc-900 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : 'bg-zinc-950 border-zinc-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase">
                    +{ch.rewardPoints} Reward Pts
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {ch.daysRemaining} days left
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{ch.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{ch.description}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-[11px] text-zinc-300">
                  Target: <strong className="text-emerald-400">{ch.targetMetric}</strong> • {ch.participantsCount} participants
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">
                  {ch.joined ? 'Status: Active ✓' : 'Open to all members'}
                </span>
                <button
                  onClick={() => handleToggleJoinChallenge(ch.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    ch.joined
                      ? 'bg-emerald-500 text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  {ch.joined ? 'Joined' : 'Join Challenge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Feed Layout (8 Cols Feed + 4 Cols Badges) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Feed (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Create Post Box */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Share Workout Win or Question
            </h3>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Log a PR, ask about a machine, or share a high-protein recipe with the club..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 font-semibold">Posting as {user.name}</span>
                </div>
                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post to Feed</span>
                </button>
              </div>
            </form>
          </div>

          {/* Posts List */}
          <div className="space-y-5">
            {posts.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-4"
              >
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-500/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.authorAvatar} alt={p.authorName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{p.authorName}</span>
                      <span className="px-2 py-0.2 rounded bg-zinc-800 text-zinc-400 text-[9px] font-medium">
                        {p.authorRole}
                      </span>
                    </h4>
                    <div className="text-[10px] text-zinc-500">{p.timeAgo}</div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs text-zinc-200 leading-relaxed">{p.content}</p>

                {p.tag && (
                  <span className="inline-block text-[11px] font-bold text-emerald-400">
                    {p.tag}
                  </span>
                )}

                {/* Like & Comment Bar */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-4 text-xs">
                  <button
                    onClick={() => handleLikePost(p.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      p.likedByMe ? 'text-rose-500' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${p.likedByMe ? 'fill-rose-500' : ''}`} />
                    <span>{p.likes} Likes</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-zinc-400 font-semibold">
                    <MessageSquare className="w-4 h-4" />
                    <span>{p.comments.length} Comments</span>
                  </div>
                </div>

                {/* Comments Section */}
                {p.comments.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/50">
                    {p.comments.map((c) => (
                      <div key={c.id} className="p-2.5 rounded-xl bg-zinc-950 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-0.5">
                          <strong className="text-zinc-300">{c.author}</strong>
                          <span>{c.timeAgo}</span>
                        </div>
                        <div className="text-zinc-300">{c.text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={newCommentText[p.id] || ''}
                    onChange={(e) =>
                      setNewCommentText((prev) => ({ ...prev, [p.id]: e.target.value }))
                    }
                    placeholder="Write an encouraging reply..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleAddComment(p.id)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Sidebar: Achievement Badges & Leaderboard (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Member Achievements Badges */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Earned Club Badges</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-500/30 space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-sm">
                  🔥
                </div>
                <div className="text-xs font-bold text-white">14-Day Streak</div>
                <div className="text-[10px] text-zinc-500">Consistency Master</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-sm">
                  🏋️
                </div>
                <div className="text-xs font-bold text-white">Centurion Lifts</div>
                <div className="text-[10px] text-zinc-500">100+ Total Sessions</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto text-sm">
                  🥗
                </div>
                <div className="text-xs font-bold text-white">Macro Precision</div>
                <div className="text-[10px] text-zinc-500">30 Days Indian Diet Log</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto text-sm">
                  🤖
                </div>
                <div className="text-xs font-bold text-white">Vision Pioneer</div>
                <div className="text-[10px] text-zinc-500">20+ Scanned Machines</div>
              </div>
            </div>
          </div>

          {/* City Leaderboard */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Bangalore Arena Leaderboard</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-amber-400/30">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400 font-mono">#1</span>
                  <span className="font-bold text-white">Rhea Kapoor</span>
                </div>
                <span className="font-mono text-zinc-400">4,920 pts</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-400 font-mono">#2</span>
                  <span className="font-bold text-white">Arjun Mehra</span>
                </div>
                <span className="font-mono text-zinc-400">3,850 pts</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-emerald-500/40 bg-emerald-500/5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400 font-mono">#8</span>
                  <span className="font-bold text-emerald-300">You ({user.name})</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">{user.points} pts</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
