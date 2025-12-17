// This file contains the web app data and simple in-memory CRUD helpers.
// There is no backend, so we also mirror the data into localStorage
// so that it persists across page reloads.

const STORAGE_KEY = 'learn_anything_data'

// We keep separate arrays for each topic so it is easy
// to render topic-specific pages later.
const defaultData = {
  html: [],
  css: [],
  js: [],
  react: [],
  backend: [],
  other: [],
}

function loadData() {
  if (typeof window === 'undefined') {
    // During build / SSR just return defaults
    return { ...defaultData }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return { ...defaultData }

    const parsed = JSON.parse(stored)

    // Make sure all keys exist even if localStorage is missing some
    return {
      ...defaultData,
      ...parsed,
    }
  } catch (e) {
    console.error('Failed to load data from localStorage', e)
    return { ...defaultData }
  }
}

let data = loadData()

function saveData() {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  } catch (e) {
    console.error('Failed to save data to localStorage', e)
  }
}

// READ
export function getAllData() {
  return data
}

export function getTopicData(topic) {
  return data[topic] || []
}

// CREATE
export function addQuestion(topic, questionData) {
  const key = data[topic] ? topic : 'other'

  if (!Array.isArray(data[key])) {
    data[key] = []
  }

  const newItem = {
    id: Date.now().toString(),
    ...questionData,
  }

  data[key].push(newItem)
  saveData()
  return newItem
}

// UPDATE
export function updateQuestion(topic, id, updates) {
  const key = data[topic] ? topic : 'other'
  const list = data[key] || []
  const index = list.findIndex((item) => item.id === id)
  if (index === -1) return null

  list[index] = {
    ...list[index],
    ...updates,
  }

  saveData()
  return list[index]
}

// DELETE
export function deleteQuestion(topic, id) {
  const key = data[topic] ? topic : 'other'
  const list = data[key] || []
  const nextList = list.filter((item) => item.id !== id)

  if (nextList.length === list.length) {
    return false
  }

  data[key] = nextList
  saveData()
  return true
}

// Optional: clear everything
export function clearAllData() {
  data = { ...defaultData }
  saveData()
}
