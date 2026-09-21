import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, Clock, Send, CheckCircle, X, Edit3, Trash2, 
  Facebook, Instagram, Linkedin, Twitter, Youtube, Globe,
  Plus, Save, AlertCircle, Users, TrendingUp, Eye
} from 'lucide-react';

interface SocialMediaDashboardProps {
  onBackToHome: () => void;
  onNavigate: (path: string) => void;
}

interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'youtube';
  content: string;
  imageUrl: string;
  linkUrl: string;
  postDate: string;
  isPublished: boolean;
  autoPostEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PostingSchedule {
  facebook: { frequency: string; day: number; time: string };
  instagram: { frequency: string; day: number; time: string };
  linkedin: { frequency: string; day: number; time: string };
  twitter: { frequency: string; day: number; time: string };
  youtube: { frequency: string; day: number; time: string };
}

const PLATFORM_CONFIG = {
  facebook: { icon: Facebook, color: '#1877F2', label: 'Facebook', maxLength: 63000 },
  instagram: { icon: Instagram, color: '#E4405F', label: 'Instagram', maxLength: 2200 },
  linkedin: { icon: Linkedin, color: '#0A66C2', label: 'LinkedIn', maxLength: 3000 },
  twitter: { icon: Twitter, color: '#1DA1F2', label: 'X (Twitter)', maxLength: 280 },
  youtube: { icon: Youtube, color: '#FF0000', label: 'YouTube', maxLength: 5000 },
};

const PLATFORM_ORDER = ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube'];

const CONTENT_TYPES = [
  { id: 'educational', label: 'Educational', color: '#10B981' },
  { id: 'social-proof', label: 'Social Proof', color: '#3B82F6' },
  { id: 'offer', label: 'Offer / Enrollment', color: '#F59E0B' },
  { id: 'behind-scenes', label: 'Behind the Scenes', color: '#8B5CF6' },
  { id: 'trend-news', label: 'Trend / News', color: '#EF4444' },
];

export const SocialMediaDashboard: React.FC<SocialMediaDashboardProps> = ({ onBackToHome, onNavigate }) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [schedule, setSchedule] = useState<PostingSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state for creating/editing a post
  const [form, setForm] = useState({
    platform: 'facebook' as SocialPost['platform'],
    content: '',
    imageUrl: '',
    linkUrl: '',
    postDate: new Date().toISOString().slice(0, 16),
    isPublished: false,
    autoPostEnabled: false,
    contentType: 'educational',
    editingId: null as string | null,
  });

  useEffect(() => {
    document.title = 'Social Media Dashboard — Mentor Arena';
    loadData();
    return () => { document.title = 'Mentor Arena'; };
  }, []);

  const loadData = async () => {
    try {
      const [postsRes, scheduleRes] = await Promise.all([
        fetch('/api/social/posts'),
        fetch('/api/social/schedule'),
      ]);
      if (postsRes.ok) setPosts(await postsRes.json());
      if (scheduleRes.ok) setSchedule(await scheduleRes.json());
    } catch (e) {
      console.error('Failed to load:', e);
      setMessage({ type: 'error', text: 'Failed to load data. Please refresh.' });
    }
    setLoading(false);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = form.editingId 
        ? `/api/social/posts/${form.editingId}`
        : '/api/social/posts';
      const method = form.editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: form.platform,
          content: form.content,
          imageUrl: form.imageUrl,
          linkUrl: form.linkUrl,
          postDate: form.postDate,
          isPublished: form.isPublished,
          autoPostEnabled: form.autoPostEnabled,
        }),
      });

      if (res.ok) {
        showMessage('success', form.editingId ? 'Post updated.' : 'Post created.');
        setForm({ ...form, editingId: null, content: '', imageUrl: '', linkUrl: '' });
        loadData();
      } else {
        const data = await res.json();
        showMessage('error', data.error || 'Failed to save post.');
      }
    } catch (e) {
      showMessage('error', 'Network error.');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/social/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showMessage('success', 'Post deleted.');
        loadData();
      } else {
        showMessage('error', 'Failed to delete.');
      }
    } catch (e) {
      showMessage('error', 'Network error.');
    }
  };

  const handleEdit = (post: SocialPost) => {
    setForm({
      platform: post.platform,
      content: post.content,
      imageUrl: post.imageUrl,
      linkUrl: post.linkUrl,
      postDate: post.postDate.slice(0, 16),
      isPublished: post.isPublished,
      autoPostEnabled: post.autoPostEnabled,
      contentType: 'educational',
      editingId: post.id,
    });
  };

  const handleScheduleUpdate = async (platform: keyof PostingSchedule, updates: Partial<PostingSchedule[typeof platform]>) => {
    if (!schedule) return;
    try {
      const updatedSchedule = { ...schedule, [platform]: { ...schedule[platform], ...updates } };
      const res = await fetch('/api/social/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSchedule),
      });
      if (res.ok) {
        setSchedule(await res.json());
        showMessage('success', `Schedule updated for ${PLATFORM_CONFIG[platform].label}.`);
      }
    } catch (e) {
      showMessage('error', 'Failed to update schedule.');
    }
  };

  const getPlatformStats = (platform: string) => {
    const platformPosts = posts.filter(p => p.platform === platform);
    const published = platformPosts.filter(p => p.isPublished).length;
    const pending = platformPosts.filter(p => !p.isPublished).length;
    return { total: platformPosts.length, published, pending };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020815] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020815] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Send className="w-6 h-6 text-brand-green" />
              Social Media Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Bi-weekly posting schedule · Manage posts, schedule, and track growth
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-brand-red/10 border-brand-red/20 text-brand-red'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Stats bar */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {PLATFORM_ORDER.map((platform) => {
            const config = PLATFORM_CONFIG[platform];
            const stats = getPlatformStats(platform);
            return (
              <div
                key={platform}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: config.color + '20' }}
                >
                  <config.icon className="w-4 h-4" style={{ color: config.color }} />
                </div>
                <p className="text-lg font-black text-white">{stats.total}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                  {stats.published} published · {stats.pending} drafts
                </p>
              </div>
            );
          })}
        </div>

        {/* Schedule overview */}
        {schedule && (
          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Bi-Weekly Posting Schedule
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {PLATFORM_ORDER.map((platform) => {
                const config = PLATFORM_CONFIG[platform];
                const sched = schedule[platform];
                return (
                  <div
                    key={platform}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <config.icon className="w-4 h-4" style={{ color: config.color }} />
                      <span className="text-xs font-bold text-gray-300">{config.label}</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Day {sched.day} (every 2 weeks)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{sched.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{sched.frequency}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Create / Edit Post Form */}
        {form.editingId || (!posts.some(p => p.platform === form.platform && !p.isPublished) && form.content) ? (
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              {form.editingId ? 'Edit Post' : 'Create New Post'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Platform</label>
                <select
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value as SocialPost['platform'] })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-brand-blue/40 outline-none"
                >
                  {PLATFORM_ORDER.map((p) => (
                    <option key={p} value={p}>{PLATFORM_CONFIG[p].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Content Type</label>
                <select
                  value={form.contentType}
                  onChange={(e) => setForm({ ...form, contentType: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-brand-blue/40 outline-none"
                >
                  {CONTENT_TYPES.map((ct) => (
                    <option key={ct.id} value={ct.id}>{ct.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Post Content <span className="text-brand-red">*</span>
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={6}
                maxLength={PLATFORM_CONFIG[form.platform].maxLength}
                placeholder="Write your post content here... (adapted for the selected platform)"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 outline-none resize-none text-sm"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-gray-500">{PLATFORM_CONFIG[form.platform].maxLength} chars max</span>
                <span className={`text-[10px] ${form.content.length > 90 ? 'text-amber-400' : 'text-gray-500'}`}>
                  {form.content.length} / {PLATFORM_CONFIG[form.platform].maxLength}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Image URL (optional)</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Link URL (optional)</label>
                <input
                  type="url"
                  value={form.linkUrl}
                  onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                  placeholder="https://mentorarena.online/..."
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue/40 outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Schedule Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={form.postDate}
                  onChange={(e) => setForm({ ...form, postDate: e.target.value })}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-brand-blue/40 outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.autoPostEnabled}
                    onChange={(e) => setForm({ ...form, autoPostEnabled: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-green focus:ring-brand-green/40"
                  />
                  <span className="text-xs text-gray-400">Auto-post (publish automatically on schedule)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-emerald-400 focus:ring-emerald-400/40"
                  />
                  <span className="text-xs text-gray-400">Mark as published</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, editingId: null, content: '', imageUrl: '', linkUrl: '' })}
                className="px-4 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !form.content.trim()}
                className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {form.editingId ? 'Update Post' : 'Create Post'}
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p className="text-gray-400 text-sm mb-3">No posts being edited. Create your first post below.</p>
            <button
              onClick={() => setForm({ platform: 'facebook', content: '', imageUrl: '', linkUrl: '', postDate: new Date().toISOString().slice(0, 16), isPublished: false, autoPostEnabled: false, contentType: 'educational', editingId: null })}
              className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Create First Post
            </button>
          </div>
        )}

        {/* Posts list */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            All Posts ({posts.length})
          </h3>

          {posts.length === 0 ? (
            <div className="p-8 text-center bg-white/5 border border-white/10 rounded-2xl">
              <Send className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">No social media posts yet. Create your first post to start growing your audience.</p>
              <button
                onClick={() => setForm({ platform: 'facebook', content: '', imageUrl: '', linkUrl: '', postDate: new Date().toISOString().slice(0, 16), isPublished: false, autoPostEnabled: false, contentType: 'educational', editingId: null })}
                className="mt-4 px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm hover:bg-brand-blue/95 transition-all"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create First Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post) => {
                const config = PLATFORM_CONFIG[post.platform];
                const isEditing = form.editingId === post.id;

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      rounded-2xl border p-5 transition-all
                      ${isEditing ? 'border-brand-blue bg-brand-blue/5' : post.isPublished ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-white/5 border-white/10'}
                    `}
                  >
                    {/* Post header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: config.color + '20' }}
                        >
                          <config.icon className="w-4 h-4" style={{ color: config.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{config.label}</p>
                          <p className="text-[10px] text-gray-500">
                            {new Date(post.postDate).toLocaleDateString('en-PK', {
                              day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {post.isPublished ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded-full border border-emerald-500/20">
                            <CheckCircle className="w-3 h-3" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase rounded-full border border-amber-500/20">
                            <Clock className="w-3 h-3" />
                            Draft
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content preview */}
                    <div className="bg-white/5 rounded-xl p-3 mb-3">
                      <p className="text-sm text-gray-300 whitespace-pre-wrap line-clamp-4">{post.content}</p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mb-3">
                      {post.linkUrl && (
                        <span className="flex items-center gap-1 text-brand-blue">
                          <Globe className="w-3 h-3" />
                          Link included
                        </span>
                      )}
                      <span>Created {new Date(post.createdAt).toLocaleDateString('en-PK')}</span>
                    </div>

                    {/* Actions */}
                    {!isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-lg hover:bg-white/10 transition-all flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="px-3 py-1.5 bg-white/5 border border-brand-red/20 text-brand-red text-xs rounded-lg hover:bg-brand-red/10 transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-brand-blue">
                        Editing... <button onClick={() => setForm({ ...form, editingId: null })} className="underline">Cancel</button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
