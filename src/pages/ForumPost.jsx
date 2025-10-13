import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const ForumPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostContent, setEditPostContent] = useState('');

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

  const canEdit = (resource) => {
    return user && (user.id === resource.user_id || user.id === 1);
  };

  const handleEditPost = async () => {
    if (!editPostTitle.trim() || !editPostContent.trim()) return;

    try {
      await api.put(`/forum/posts/${id}`, {
        title: editPostTitle,
        content: editPostContent
      });
      setEditingPostId(null);
      await fetchPost();
    } catch (error) {
      console.error('Failed to edit post:', error);
      alert(error.response?.data?.error || '수정에 실패했습니다.');
    }
  };

  const handleDeletePost = async () => {
    if (!confirm('정말 삭제하시겠습니까? 게시글과 모든 댓글이 삭제됩니다.')) return;

    try {
      await api.delete(`/forum/posts/${id}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/forum');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert(error.response?.data?.error || '삭제에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/forum/comments/${commentId}`);
      await fetchPost();
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert(error.response?.data?.error || '삭제에 실패했습니다.');
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
          {editingPostId === post.id ? (
            // 수정 모드
            <div className="space-y-4">
              <input
                type="text"
                value={editPostTitle}
                onChange={(e) => setEditPostTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 font-retro text-2xl"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderColor: 'var(--color-vhs-purple)',
                  color: 'var(--color-ash-beige)'
                }}
                placeholder="제목"
                maxLength={100}
              />
              <textarea
                value={editPostContent}
                onChange={(e) => setEditPostContent(e.target.value)}
                className="w-full h-64 px-4 py-3 rounded-lg border-2 resize-none"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderColor: 'var(--color-vhs-purple)',
                  color: 'var(--color-ash-beige)'
                }}
                placeholder="내용"
                maxLength={2000}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setEditingPostId(null);
                    setEditPostTitle('');
                    setEditPostContent('');
                  }}
                  className="px-4 py-2 rounded-lg font-retro"
                  style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                >
                  취소
                </button>
                <button
                  onClick={handleEditPost}
                  className="px-4 py-2 rounded-lg font-retro"
                  style={{ backgroundColor: 'var(--color-vhs-purple)', color: 'white' }}
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-retro flex-1">{post.title}</h1>
                {canEdit(post) && (
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => {
                        setEditingPostId(post.id);
                        setEditPostTitle(post.title);
                        setEditPostContent(post.content);
                      }}
                      className="text-xs px-3 py-1 rounded hover:opacity-80"
                      style={{ backgroundColor: 'rgba(160, 255, 184, 0.2)', color: 'var(--color-toxic-green)' }}
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="text-xs px-3 py-1 rounded hover:opacity-80"
                      style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)', color: '#ff6b6b' }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span>👤 {post.username}</span>
                {user?.id === 1 && (
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700' }}>
                    👤 user_id: {post.user_id}
                  </span>
                )}
                <span>👁️ {post.views}회</span>
                <span>{new Date(post.created_at).toLocaleString('ko-KR')}</span>
              </div>
              <p className="text-lg whitespace-pre-wrap mb-6">{post.content}</p>
            </>
          )}

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
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="font-retro">{comment.username}</span>
                  {user?.id === 1 && (
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', color: '#FFD700' }}>
                      👤 user_id: {comment.user_id}
                    </span>
                  )}
                  <span>{new Date(comment.created_at).toLocaleString('ko-KR')}</span>
                </div>
                {canEdit(comment) && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-xs px-3 py-1 rounded hover:opacity-80"
                    style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)', color: '#ff6b6b' }}
                  >
                    삭제
                  </button>
                )}
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
