const API_BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || `Request failed: ${res.status}`)
  }

  // 204 No Content
  if (res.status === 204) return null
  return res.json()
}

// READ
export async function getAllData() {
  return request('/data')
}

export async function getTopicData(topic) {
  return request(`/topic/${encodeURIComponent(topic)}`)
}

// CREATE
export async function addQuestion(topic, questionData) {
  return request('/questions', {
    method: 'POST',
    body: JSON.stringify({
      topic,
      ...questionData,
    }),
  })
}

// UPDATE
export async function updateQuestion(topic, id, updates) {
  return request(`/questions/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify({
      topic,
      ...updates,
    }),
  })
}

// DELETE
export async function deleteQuestion(topic, id) {
  return request(`/questions/${encodeURIComponent(id)}?topic=${encodeURIComponent(topic)}`, {
    method: 'DELETE',
  })
}

// Optional: clear everything
export async function clearAllData() {
  // If needed, implement a dedicated endpoint; for now we can PATCH with empty arrays
  const data = {
    html: [],
    css: [],
    js: [],
    react: [],
    backend: [],
    other: [],
  }
  return request('/data', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}
