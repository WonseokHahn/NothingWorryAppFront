import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const MeaninglessForum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'general', label: '일반 허무' },
    { value: 'life', label: '인생 고민' },
    { value: 'work', label: '직장 허무' },
    { value: 'relationship', label: '관계의 허무' },
  ];

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/forum/posts?category=${category}`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadgeColor = (cat) => {
    const colors = {
      general: '#8B5CF6',
      life: '#A0FFB8',
      work: '#DAD7CD',
      relationship: '#FF6B9D'
    };
    return colors[cat] || '#8B5CF6';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-retro mb-4" style={{ color: 'var(--color-vhs-purple)' }}>
            무의미 게시판
          </h1>
          <p className="text-gray-400">허무한 주제로 토론하세요. AI 철학자가 끼어들 수도 있습니다...</p>
        </motion.div>

        {/* 카테고리 필터 & 글쓰기 버튼 */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-retro transition-all ${
                  category === cat.value ? 'opacity-100' : 'opacity-50'
                }`}
                style={{
                  backgroundColor: category === cat.value ? 'var(--color-vhs-purple)' : 'rgba(139, 92, 246, 0.2)',
                  color: 'white'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/forum/new')}
            className="px-6 py-2 rounded-lg font-retro transition-all"
            style={{
              backgroundColor: 'var(--color-toxic-green)',
              color: '#1a1a1a'
            }}
          >
            글쓰기
          </button>
        </div>

        {/* 게시글 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--color-vhs-purple)', borderTopColor: 'transparent' }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/forum/post/${post.id}`)}
                  className="p-5 rounded-lg border-2 hover:border-opacity-100 transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    borderColor: 'rgba(139, 92, 246, 0.3)'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-1 rounded text-xs font-retro"
                          style={{
                            backgroundColor: getCategoryBadgeColor(post.category),
                            color: 'white'
                          }}
                        >
                          {categories.find(c => c.value === post.category)?.label || '일반'}
                        </span>
                        {post.ai_philosopher && (
                          <span className="text-xs text-gray-400">
                            🤖 {post.ai_philosopher} 참여
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-retro mb-2">{post.title}</h3>
                      <p className="text-gray-300 line-clamp-2">{post.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>👤 {post.username}</span>
                    <span>💬 {post.comment_count}개 댓글</span>
                    <span>👁️ {post.views}회</span>
                    <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-2">아직 게시글이 없습니다.</p>
            <p>첫 번째로 허무한 주제를 올려보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeaninglessForum;
