import React, { useState } from 'react'
import { addQuestion } from '../../data/data'

const initialFormState = {
  topic: 'html',
  question: '',
  answer: '',
  difficulty: 'easy',
  source: '',
  notes: '',
  tags: '',
}

const AddData = () => {
  const [form, setForm] = useState(initialFormState)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setLoading(false)

    if (!form.question.trim() || !form.answer.trim()) {
      setStatus('Please fill in both question and answer.')
      return
    }

    const tags =
      form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean) || []

    setLoading(true)
    try {
      await addQuestion(form.topic, {
        question: form.question.trim(),
        answer: form.answer.trim(),
        difficulty: form.difficulty,
        source: form.source.trim(),
        notes: form.notes.trim(),
        tags,
      })

      setForm(initialFormState)
      setStatus('Question added successfully!')
    } catch (err) {
      setStatus(err.message || 'Failed to add question. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-data-page border-2 border-base_border rounded-xl" style={{ maxWidth: 700, margin: '2rem auto', padding: '1.5rem' }}>
      <h1 className='text-3xl font-bold mb-1 text-heading_color'>Add Learning Item</h1>

      <form onSubmit={handleSubmit} className="add-data-form" style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label htmlFor="topic" className='mb-1 font-bold text-sub_heading' style={{ display: 'block'}}>
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={form.topic}
            onChange={handleChange}
            className='w-full py-2 px-3 text-text_color rounded-xl bg-gray-100'
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            <option value="react">React</option>
            <option value="backend">Backend / Node</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="question" className='mb-1 font-bold text-sub_heading' style={{ display: 'block' }}>
            Question / Concept
          </label>
          <textarea
            id="question"
            name="question"
            value={form.question}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. What is the difference between block and inline elements in HTML?"
            className='w-full p-2 text-text_color rounded-xl bg-gray-100'
          />
        </div>

        <div>
          <label htmlFor="answer" className='mb-1 font-bold text-sub_heading' style={{ display: 'block' }}>
            Answer / Explanation
          </label>
          <textarea
            id="answer"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            rows={4}
            placeholder="Write a clear explanation or example here..."
            className='w-full p-2 text-text_color rounded-xl bg-gray-100'
          />
        </div>

        <div>
          <label htmlFor="difficulty" className='mb-1 font-bold text-sub_heading' style={{ display: 'block' }}>
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
           className='w-full py-2 px-3 text-text_color rounded-xl bg-gray-100'
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label htmlFor="source" className='mb-1 font-bold text-sub_heading' style={{ display: 'block' }}>
            Source (link, course, video, etc.)
          </label>
          <input
            id="source"
            name="source"
            type="text"
            value={form.source}
            onChange={handleChange}
            placeholder="e.g. MDN article, YouTube video URL"
            className='w-full p-2 text-text_color rounded-xl bg-gray-100'
          />
        </div>

        <div>
          <label htmlFor="notes" className='mb-1 font-bold text-sub_heading' style={{ display: 'block' }}>
            Extra Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any extra tips, code snippets, or reminders..."
           className='w-full p-2 text-text_color rounded-xl bg-gray-100'
          />
        </div>

        <div>
          <label htmlFor="tags" className='mb-1 font-bold text-sub_heading' style={{ display: 'block' }}>
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            placeholder="e.g. flexbox, layout, basics"
            className='w-full p-2 text-text_color rounded-xl bg-gray-100'
          />
        </div>

        <button
          type="submit"
          className='px-5 py-3 font-semibold rounded-xl cursor-pointer mt-2 bg-primary'
          style={{

            color: 'white',

          }}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>

        {status && (
          <p style={{ marginTop: '0.5rem', color: status.includes('successfully') ? 'green' : 'red' }}>
            {status}
          </p>
        )}
      </form>
    </div>
  )
}

export default AddData