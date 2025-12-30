import React, { memo } from 'react'

const QuestionCard = ({ item, expandedId, onToggleExpand, onDelete, getDifficultyColor }) => {
  const isExpanded = expandedId === item.id

  return (
    <div className="border-2 border-base_border rounded-xl bg-card_bg p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-heading_color mb-2">
            {item.question}
          </h3>
          <div className="flex flex-wrap gap-2 items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                item.difficulty
              )}`}
            >
              {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
            </span>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded bg-base_color text-text_color text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="ml-4 px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg font-semibold"
        >
          Delete
        </button>
      </div>

      <div className="mt-3">
        <button
          onClick={() => onToggleExpand(item.id)}
          className="text-primary font-semibold hover:underline mb-1"
        >
          {isExpanded ? 'Hide Answer' : 'Show Answer'}
        </button>

        {isExpanded && (
          <div className="mt-2 space-y-3">
            <div className="bg-white rounded-lg p-4 border border-base_border">
              {/* <h4 className="font-bold text-sub_heading mb-2">Answer / Explanation:</h4> */}
              <p className="text-text_color whitespace-pre-wrap">{item.answer}</p>
            </div>

            {item.source && (
              <div className="bg-white rounded-lg p-4 border border-base_border">
                <h4 className="font-bold text-sub_heading mb-2">Source:</h4>
                <p className="text-text_color">
                  {item.source.startsWith('http') ? (
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {item.source}
                    </a>
                  ) : (
                    item.source
                  )}
                </p>
              </div>
            )}

            {item.notes && (
              <div className="bg-white rounded-lg p-4 border border-base_border">
                <h4 className="font-bold text-sub_heading mb-2">Extra Notes:</h4>
                <p className="text-text_color whitespace-pre-wrap">{item.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

QuestionCard.displayName = 'QuestionCard'

export default memo(QuestionCard)


