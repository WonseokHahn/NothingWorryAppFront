import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const SharedEmotionBoard = () => {
  const { user } = useAuth();
  const [emotions, setEmotions] = useState([]);
  const [topEmotion, setTopEmotion] = useState(null);
  const [newEmotion, setNewEmotion] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    fetchEmotions();
    fetchTopEmotion();
  }, [sortBy]);

  const fetchEmotions = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/shared-emotions?sort=${sortBy}`);
      setEmotions(response.data.emotions);
    } catch (error) {
      console.error('Failed to fetch emotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopEmotion = async () => {
    try {
      const response = await api.get('/shared-emotions/today-top');
      if (response.data.emotion) {
        setTopEmotion(response.data.emotion);
      }
    } catch (error) {
      console.error('Failed to fetch top emotion:', error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newEmotion.trim()) return;

    try {
      setIsPosting(true);
      await api.post('/shared-emotions', {
        content: newEmotion,
        is_anonymous: true
      });
      setNewEmotion('');
      await fetchEmotions();
    } catch (error) {
      console.error('Failed to post emotion:', error);
      alert('감정 게시에 실패했습니다.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleEdit = async (emotionId) => {
    if (!editContent.trim()) return;

    try {
      await api.put(`/shared-emotions/${emotionId}`, {
        content: editContent
      });
      setEditingId(null);
      setEditContent('');
      await fetchEmotions();
    } catch (error) {
      console.error('Failed to edit emotion:', error);
      alert(error.response?.data?.error || '수정에 실패했습니다.');
    }
  };

  const handleDelete = async (emotionId) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/shared-emotions/${emotionId}`);
      await fetchEmotions();
      await fetchTopEmotion();
    } catch (error) {
      console.error('Failed to delete emotion:', error);
      alert(error.response?.data?.error || '삭제에 실패했습니다.');
    }
  };

  const handleReaction = async (emotionId, reactionType) => {
    try {
      await api.post(`/shared-emotions/${emotionId}/react`, {
        reaction_type: reactionType
      });
      await fetchEmotions();
      await fetchTopEmotion();
    } catch (error) {
      console.error('Failed to react:', error);
      alert('반응 추가에 실패했습니다.');
    }
  };

  const canEdit = (emotion) => {
    return user && (user.id === emotion.user_id || user.id === 1);
  };

  const getReactionEmoji = (type) => {
    const emojis = {
      empty: '😑',
      laugh: '😆',
      void: '🕳️'
    };
    return emojis[type] || '❓';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-retro mb-4" style={{ color: 'var(--color-vhs-purple)' }}>
            공유되는 허무
          </h1>
          <p className="text-gray-400">익명으로 당신의 감정을 버리세요. 누군가는 공감할지도...</p>
        </motion.div>

        {/* 오늘의 대표 허무글 */}
        {topEmotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 rounded-lg border-2"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              borderColor: 'var(--color-vhs-purple)'
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">👑</span>
              <h2 className="text-xl font-retro" style={{ color: 'var(--color-vhs-purple)' }}>
                오늘의 대표 허무글
              </h2>
            </div>
            <p className="text-lg mb-3">{topEmotion.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{topEmotion.username}</span>
              <div className="flex gap-3">
                <span>😑 {topEmotion.reaction_empty}</span>
                <span>😆 {topEmotion.reaction_laugh}</span>
                <span>🕳️ {topEmotion.reaction_void}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 감정 게시 폼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <form onSubmit={handlePost} className="space-y-4">
            <textarea
              value={newEmotion}
              onChange={(e) => setNewEmotion(e.target.value)}
              placeholder="당신의 허무를 익명으로 공유하세요... (예: 오늘도 의미 없이 살았다)"
              className="w-full h-32 px-4 py-3 rounded-lg border-2 resize-none"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                borderColor: 'var(--color-vhs-purple)',
                color: 'var(--color-ash-beige)'
              }}
              maxLength={300}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{newEmotion.length}/300</span>
              <button
                type="submit"
                disabled={isPosting || !newEmotion.trim()}
                className="px-6 py-2 rounded-lg font-retro transition-all duration-300 disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--color-vhs-purple)',
                  color: 'white'
                }}
              >
                {isPosting ? '게시 중...' : '익명으로 버리기'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* 정렬 옵션 */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-4 py-2 rounded-lg font-retro transition-all ${
              sortBy === 'recent' ? 'opacity-100' : 'opacity-50'
            }`}
            style={{
              backgroundColor: sortBy === 'recent' ? 'var(--color-vhs-purple)' : 'rgba(139, 92, 246, 0.2)',
              color: 'white'
            }}
          >
            최신순
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-4 py-2 rounded-lg font-retro transition-all ${
              sortBy === 'popular' ? 'opacity-100' : 'opacity-50'
            }`}
            style={{
              backgroundColor: sortBy === 'popular' ? 'var(--color-vhs-purple)' : 'rgba(139, 92, 246, 0.2)',
              color: 'white'
            }}
          >
            인기순
          </button>
        </div>

        {/* 감정 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--color-vhs-purple)', borderTopColor: 'transparent' }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {emotions.map((emotion, index) => (
                <motion.div
                  key={emotion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-lg border-2 hover:border-opacity-100 transition-all"
                  style={{
                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    borderColor: 'rgba(139, 92, 246, 0.3)'
                  }}
                >
                  {editingId === emotion.id ? (
                    // 수정 모드
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-24 px-3 py-2 rounded border"
                        style={{
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          borderColor: 'var(--color-vhs-purple)'
                        }}
                        maxLength={300}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditContent('');
                          }}
                          className="px-4 py-1 rounded text-sm"
                          style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleEdit(emotion.id)}
                          className="px-4 py-1 rounded text-sm"
                          style={{ backgroundColor: 'var(--color-vhs-purple)' }}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg mb-4">{emotion.content}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-400">
                            <span>{emotion.username}</span>
                            {user?.id === 1 && (
                              <span className="ml-2 text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700' }}>
                                👤 user_id: {emotion.user_id}
                              </span>
                            )}
                            <span className="mx-2">•</span>
                            <span>{new Date(emotion.created_at).toLocaleString('ko-KR')}</span>
                          </div>
                          {canEdit(emotion) && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingId(emotion.id);
                                  setEditContent(emotion.content);
                                }}
                                className="text-xs px-3 py-1 rounded hover:opacity-80"
                                style={{ backgroundColor: 'rgba(160, 255, 184, 0.2)', color: 'var(--color-toxic-green)' }}
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDelete(emotion.id)}
                                className="text-xs px-3 py-1 rounded hover:opacity-80"
                                style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)', color: '#ff6b6b' }}
                              >
                                삭제
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {['empty', 'laugh', 'void'].map((type) => (
                            <button
                              key={type}
                              onClick={() => handleReaction(emotion.id, type)}
                              className="flex items-center gap-1 px-3 py-1 rounded-full transition-all hover:scale-110"
                              style={{
                                backgroundColor: 'rgba(139, 92, 246, 0.2)'
                              }}
                            >
                              <span>{getReactionEmoji(type)}</span>
                              <span className="text-sm">{emotion[`reaction_${type}`]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {emotions.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-2">아직 아무도 감정을 버리지 않았습니다.</p>
            <p>첫 번째로 당신의 허무를 공유해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedEmotionBoard;
