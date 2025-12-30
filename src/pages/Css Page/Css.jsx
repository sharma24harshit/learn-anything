import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getTopicData, deleteQuestion } from '../../data/data'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard/QuestionCard'

const Css = () => {
  const [questions, setQuestions] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const topic = 'css'

  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }, [])

  const loadQuestions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTopicData(topic)
      setQuestions(data)
    } catch (err) {
      console.error('Failed to load CSS questions', err)
      setError('Failed to load questions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [topic])

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm('Are you sure you want to delete this question?')) return

      try {
        await deleteQuestion(topic, id)
        await loadQuestions()
        if (expandedId === id) {
          setExpandedId(null)
        }
      } catch (err) {
        console.error('Failed to delete question', err)
        alert('Failed to delete. Please try again.')
      }
    },
    [loadQuestions, expandedId, topic]
  )

  const toggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => parseInt(b.id) - parseInt(a.id))
  }, [questions])

  return (
    <div className="html-page" style={{ maxWidth: 1200, margin: '2rem auto', padding: '1.5rem' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-heading_color">CSS Questions</h1>
        <div className="flex gap-3">
          <button
            onClick={loadQuestions}
            disabled={isLoading}
            className="px-4 py-2 font-semibold rounded-xl cursor-pointer bg-base_color text-text_color hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={() => navigate('/add_data')}
            className="px-4 py-2 font-semibold rounded-xl cursor-pointer bg-primary text-white hover:opacity-90"
          >
            Add New Question
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {isLoading && questions.length === 0 ? (
        <div className="text-center py-12 border-2 border-base_border rounded-xl bg-card_bg">
          <p className="text-xl text-text_color">Loading CSS questions...</p>
        </div>
      ) : sortedQuestions.length === 0 ? (
        <div className="text-center py-12 border-2 border-base_border rounded-xl bg-card_bg">
          <p className="text-xl text-text_color mb-4">No CSS questions yet!</p>
          <p className="text-text_color mb-4">Start adding questions to see them here.</p>
          <button
            onClick={() => navigate('/add_data')}
            className="px-5 py-3 font-semibold rounded-xl cursor-pointer bg-primary text-white hover:opacity-90"
          >
            Add Your First Question
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedQuestions.map((item) => (
            <QuestionCard
              key={item.id}
              item={item}
              expandedId={expandedId}
              onToggleExpand={toggleExpand}
              onDelete={handleDelete}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Css