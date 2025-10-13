import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const DailyQuest = () => {
  const [quest, setQuest] = useState(null);
  const [stats, setStats] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');

  useEffect(() => {
    fetchQuest();
    fetchStats();
  }, []);

  const fetchQuest = async () => {
    try {
      setLoading(true);
      const response = await api.get('/quests/today');
      setQuest(response.data.quest);
      setCompleted(response.data.completed);
    } catch (error) {
      console.error('Failed to fetch quest:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/quests/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleComplete = async () => {
    if (completed) return;

    try {
      setCompleting(true);
      const response = await api.post(`/quests/${quest.id}/complete`);
      setCompletionMessage(response.data.message);
      setCompleted(true);
      setShowCelebration(true);

      // 통계 새로고침
      await fetchStats();

      // 3초 후 축하 메시지 숨기기
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to complete quest:', error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    } finally {
      setCompleting(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      meditation: '🧘',
      social: '👥',
      void: '🕳️',
      outdoor: '🌤️',
      creative: '🎨',
      emotional: '💭'
    };
    return icons[category] || '✨';
  };

  const getCategoryColor = (category) => {
    const colors = {
      meditation: '#8B5CF6',
      social: '#A0FFB8',
      void: '#DAD7CD',
      outdoor: '#87CEEB',
      creative: '#FF6B9D',
      emotional: '#FFB74D'
    };
    return colors[category] || '#8B5CF6';
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

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-retro mb-4" style={{ color: 'var(--color-vhs-purple)' }}>
            일일 무의미 퀘스트
          </h1>
          <p className="text-gray-400">매일 하나씩, 의미 없는 일을 해보세요</p>
        </motion.div>

        {/* 통계 */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            <div
              className="p-4 rounded-lg text-center"
              style={{
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderColor: 'var(--color-vhs-purple)',
                border: '2px solid'
              }}
            >
              <div className="text-3xl font-retro mb-1" style={{ color: 'var(--color-vhs-purple)' }}>
                {stats.total_completed}
              </div>
              <div className="text-sm text-gray-400">총 완료</div>
            </div>
            <div
              className="p-4 rounded-lg text-center"
              style={{
                backgroundColor: 'rgba(160, 255, 184, 0.1)',
                borderColor: 'var(--color-toxic-green)',
                border: '2px solid'
              }}
            >
              <div className="text-3xl font-retro mb-1" style={{ color: 'var(--color-toxic-green)' }}>
                {stats.this_week}
              </div>
              <div className="text-sm text-gray-400">이번 주</div>
              {stats.streak && (
                <div className="text-xs mt-1">{stats.streak}</div>
              )}
            </div>
          </motion.div>
        )}

        {/* 오늘의 퀘스트 */}
        <AnimatePresence mode="wait">
          {quest && (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 rounded-lg border-2 relative overflow-hidden"
              style={{
                backgroundColor: completed ? 'rgba(160, 255, 184, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                borderColor: completed ? 'var(--color-toxic-green)' : 'var(--color-vhs-purple)'
              }}
            >
              {/* 완료 배지 */}
              {completed && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute top-4 right-4 text-6xl"
                >
                  ✓
                </motion.div>
              )}

              {/* 카테고리 아이콘 */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">
                  {getCategoryIcon(quest.category)}
                </span>
                <div>
                  <h2 className="text-2xl font-retro">{quest.title}</h2>
                  <span
                    className="inline-block px-2 py-1 rounded text-xs font-retro mt-1"
                    style={{
                      backgroundColor: getCategoryColor(quest.category),
                      color: 'white'
                    }}
                  >
                    {quest.category}
                  </span>
                </div>
              </div>

              <p className="text-lg mb-6 text-gray-300">{quest.description}</p>

              {/* 완료 버튼 */}
              <button
                onClick={handleComplete}
                disabled={completed || completing}
                className="w-full py-4 rounded-lg font-retro text-lg transition-all disabled:opacity-50"
                style={{
                  backgroundColor: completed ? 'var(--color-toxic-green)' : 'var(--color-vhs-purple)',
                  color: 'white'
                }}
              >
                {completing
                  ? '확인 중...'
                  : completed
                  ? '✓ 완료함'
                  : '완료하기'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 축하 메시지 */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div
                className="p-8 rounded-lg border-2 max-w-md pointer-events-auto"
                style={{
                  backgroundColor: 'rgba(160, 255, 184, 0.95)',
                  borderColor: 'var(--color-toxic-green)'
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-retro mb-2" style={{ color: '#1a1a1a' }}>
                    퀘스트 완료!
                  </h3>
                  <p className="text-lg" style={{ color: '#1a1a1a' }}>
                    {completionMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 설명 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-lg"
          style={{
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            border: '2px solid rgba(139, 92, 246, 0.2)'
          }}
        >
          <h3 className="font-retro mb-3" style={{ color: 'var(--color-vhs-purple)' }}>
            💡 어떻게 하나요?
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>• 매일 새로운 무의미한 퀘스트가 생성됩니다</li>
            <li>• 퀘스트를 수행한 후 "완료하기" 버튼을 누르세요</li>
            <li>• 실제로 했는지 안 했는지는 아무도 몰라요 (의미 없으니까)</li>
            <li>• 7일 연속 완료하면 특별한 배지를 받습니다</li>
            <li>• 어차피 의미 없지만... 뭔가 재밌어요</li>
          </ul>
        </motion.div>

        {/* 과거 퀘스트 히스토리 (선택사항) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-gray-400"
        >
          <p className="text-sm">
            내일 다시 와서 새로운 무의미를 경험하세요
          </p>
          <p className="text-xs mt-1">
            (어차피 매일 비슷하겠지만)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyQuest;
