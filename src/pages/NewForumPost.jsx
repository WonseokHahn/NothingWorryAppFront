import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';

const NewForumPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [posting, setPosting] = useState(false);
  const [philosopherResponse, setPhilosopherResponse] = useState(null);

  const categories = [
    { value: 'general', label: '일반 허무' },
    { value: 'life', label: '인생 고민' },
    { value: 'work', label: '직장 허무' },
    { value: 'relationship', label: '관계의 허무' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setPosting(true);
      const response = await api.post('/forum/posts', {
        title,
        content,
        category
      });

      // AI 철학자 응답 표시
      setPhilosopherResponse({
        philosopher: response.data.ai_philosopher,
        response: response.data.ai_response
      });

      // 3초 후 게시글로 이동
      setTimeout(() => {
        navigate(`/forum/post/${response.data.id}`);
      }, 3000);
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('게시글 작성에 실패했습니다.');
      setPosting(false);
    }
  };

  if (philosopherResponse) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full p-8 rounded-lg border-2 text-center"
          style={{
            backgroundColor: 'rgba(160, 255, 184, 0.1)',
            borderColor: 'var(--color-toxic-green)'
          }}
        >
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-retro mb-4" style={{ color: 'var(--color-toxic-green)' }}>
            {philosopherResponse.philosopher}가 등장했습니다!
          </h2>
          <p className="text-lg mb-6">{philosopherResponse.response}</p>
          <div className="text-sm text-gray-400">
            게시글로 이동 중...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/forum')}
            className="mb-4 px-4 py-2 rounded-lg font-retro transition-all"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              color: 'var(--color-vhs-purple)'
            }}
          >
            ← 취소
          </button>
          <h1 className="text-4xl font-retro" style={{ color: 'var(--color-vhs-purple)' }}>
            새 허무 게시글
          </h1>
          <p className="text-gray-400 mt-2">AI 철학자가 당신의 허무에 응답할 것입니다...</p>
        </motion.div>

        {/* 작성 폼 */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* 카테고리 선택 */}
          <div>
            <label className="block text-sm font-retro mb-2">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                borderColor: 'var(--color-vhs-purple)',
                color: 'var(--color-ash-beige)'
              }}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-retro mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 인생은 왜 이렇게 귀찮을까?"
              className="w-full px-4 py-3 rounded-lg border-2"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                borderColor: 'var(--color-vhs-purple)',
                color: 'var(--color-ash-beige)'
              }}
              maxLength={100}
            />
            <div className="text-sm text-gray-400 mt-1 text-right">
              {title.length}/100
            </div>
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-retro mb-2">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="당신의 허무한 생각을 자유롭게 적어보세요..."
              className="w-full h-64 px-4 py-3 rounded-lg border-2 resize-none"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                borderColor: 'var(--color-vhs-purple)',
                color: 'var(--color-ash-beige)'
              }}
              maxLength={2000}
            />
            <div className="text-sm text-gray-400 mt-1 text-right">
              {content.length}/2000
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/forum')}
              className="px-6 py-3 rounded-lg font-retro transition-all"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                color: 'var(--color-vhs-purple)'
              }}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={posting || !title.trim() || !content.trim()}
              className="px-6 py-3 rounded-lg font-retro transition-all disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-vhs-purple)',
                color: 'white'
              }}
            >
              {posting ? '작성 중...' : '게시하기'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default NewForumPost;
