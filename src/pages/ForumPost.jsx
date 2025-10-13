import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';

const ForumPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/forum/posts/${id}`);
      setPost(response.data.post);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Failed to fetch post:', error);
      alert('게시글을 불러올 수 없습니다.');
      navigate('/forum');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setPosting(true);
      await api.post(`/forum/posts/${id}/comments`, {
        content: newComment
      });
      setNewComment('');
      await fetchPost();
    } catch (error) {
      console.error('Failed to post comment:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: 'var(--color-vhs-purple)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate('/forum')}
          className="mb-6 px-4 py-2 rounded-lg font-retro transition-all"
          style={{
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            color: 'var(--color-vhs-purple)'
          }}
        >
          ← 목록으로
        </button>

        {/* 게시글 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg border-2 mb-6"
          style={{
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            borderColor: 'var(--color-vhs-purple)'
          }}
        >
          <h1 className="text-3xl font-retro mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span>👤 {post.username}</span>
            <span>👁️ {post.views}회</span>
            <span>{new Date(post.created_at).toLocaleString('ko-KR')}</span>
          </div>
          <p className="text-lg whitespace-pre-wrap mb-6">{post.content}</p>

          {/* AI 철학자 응답 */}
          {post.ai_response && (
            <div
              className="p-4 rounded-lg border-2 mt-6"
              style={{
                backgroundColor: 'rgba(160, 255, 184, 0.1)',
                borderColor: 'var(--color-toxic-green)'
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🤖</span>
                <span className="font-retro" style={{ color: 'var(--color-toxic-green)' }}>
                  {post.ai_philosopher}의 견해
                </span>
              </div>
              <p className="text-gray-300">{post.ai_response}</p>
            </div>
          )}
        </motion.div>

        {/* 댓글 작성 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-retro mb-4">댓글 작성</h2>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="당신의 허무한 의견을 남겨보세요..."
              className="w-full h-24 px-4 py-3 rounded-lg border-2 resize-none"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                borderColor: 'var(--color-vhs-purple)',
                color: 'var(--color-ash-beige)'
              }}
              maxLength={500}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={posting || !newComment.trim()}
                className="px-6 py-2 rounded-lg font-retro transition-all disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--color-vhs-purple)',
                  color: 'white'
                }}
              >
                {posting ? '작성 중...' : '댓글 달기'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          <h2 className="text-xl font-retro mb-4">
            댓글 {comments.length}개
          </h2>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.03)',
                borderColor: 'rgba(139, 92, 246, 0.2)'
              }}
            >
              <div className="flex items-center gap-3 mb-2 text-sm text-gray-400">
                <span className="font-retro">{comment.username}</span>
                <span>{new Date(comment.created_at).toLocaleString('ko-KR')}</span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </motion.div>
          ))}
          {comments.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              첫 번째 댓글을 작성해보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPost;
