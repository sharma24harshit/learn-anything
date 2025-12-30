import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getTopicData, deleteQuestion } from '../../data/data'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard/QuestionCard'

const Html = () => {
  const [htmlQuestions, setHtmlQuestions] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Memoized difficulty color function
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

  // Memoized load questions function
  const loadQuestions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const questions = await getTopicData('html')
      setHtmlQuestions(questions)
    } catch (err) {
      console.error('Failed to load HTML questions', err)
      setError('Failed to load questions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Memoized delete handler
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return

    try {
      await deleteQuestion('html', id)
      await loadQuestions() // Refresh the list
      if (expandedId === id) {
        setExpandedId(null)
      }
    } catch (err) {
      console.error('Failed to delete question', err)
      alert('Failed to delete. Please try again.')
    }
  }, [loadQuestions, expandedId])

  // Memoized toggle expand handler
  const toggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  // Load questions on component mount (no polling)
  useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  // Memoized sorted questions (newest first)
  const sortedQuestions = useMemo(() => {
    return [...htmlQuestions].sort((a, b) => {
      // Sort by ID (timestamp) descending - newest first
      return parseInt(b.id) - parseInt(a.id)
    })
  }, [htmlQuestions])

  return (
    <div className="html-page" style={{ maxWidth: 1200, margin: '2rem auto', padding: '1.5rem' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-heading_color">HTML Questions</h1>
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

      {isLoading && htmlQuestions.length === 0 ? (
        <div className="text-center py-12 border-2 border-base_border rounded-xl bg-card_bg">
          <p className="text-xl text-text_color">Loading HTML questions...</p>
        </div>
      ) : sortedQuestions.length === 0 ? (
        <div className="text-center py-12 border-2 border-base_border rounded-xl bg-card_bg">
          <p className="text-xl text-text_color mb-4">No HTML questions yet!</p>
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

export default Html
