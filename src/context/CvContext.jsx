import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import {
  DEFAULT_PROFILE,
  DEFAULT_SECTIONS,
  DEFAULT_SETTINGS,
  TEMPLATES,
  STEP_DEFINITIONS
} from '@/config/constants'
import { computeLayout } from '@/lib/pagination'
import { ThemeProvider } from './ThemeContext'

const STORAGE_KEY = 'makemycv:v1'

//Context for CV data and settings. This is the main state of the app, and is persisted to localStorage.
const CvContext = createContext(null)

const getInitialState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
        sections: {
          exp: Array.isArray(parsed.sections?.exp) ? parsed.sections.exp : DEFAULT_SECTIONS.exp,
          edu: Array.isArray(parsed.sections?.edu) ? parsed.sections.edu : DEFAULT_SECTIONS.edu,
          proj: Array.isArray(parsed.sections?.proj) ? parsed.sections.proj : DEFAULT_SECTIONS.proj,
        },
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
      }
    }
  } catch (_) {
    // ignore
  }
  return {
    profile: DEFAULT_PROFILE,
    sections: DEFAULT_SECTIONS,
    settings: DEFAULT_SETTINGS,
  }
}

export function CvProvider ({ children }) {
  const [initial] = useState(getInitialState)
  const [profile, setProfile] = useState(initial.profile)
  const [sections, setSections] = useState(initial.sections)
  const [settings, setSettings] = useState(initial.settings)

  const[activeStep, setActiveStep] = useState(STEP_DEFINITIONS[0].id)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState('edit') // 'edit' | 'preview'

  //Toast state for showing temporary messages to the user. This is used for actions like "Copied to clipboard" or "Settings saved".
  const [toast, setToast] = useState(null)
  
  const showToast = useCallback((message, error = false) => {
    setToast({ show: true, message, error })
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, error ? 5000 : 3000)
    return () => clearTimeout(timer)
  }, [])

  //Persist CV data to localStorage whenever it changes.
  useEffect(() => {
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, sections, settings }))
    } catch(_) {
      // ignore
    }
  }, [profile, sections, settings])

  //Profile Update
  const updateProfile = useCallback((newProfile) => {
    setProfile((prev) => ({ ...prev, [field]: value}))
  }, [])

  //Section Entry Update
  const updateSectionEntry = useCallback((section, id, field, value) => {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].map((entry) => entry.id === id ? { ...entry, [field]: value } : entry)
    }))
  }, [])

  // Add section entry
  const addSectionEntry = useCallback((section) => {
    const newId = `${section}-${Date.now()}`
    setSections((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: newId, t: '', o: '', d: '', x: '' }]
    }))
  }, [])

  // Remove section entry
  const removeSectionEntry = useCallback((section, id) => {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].filter((entry) => entry.id !== id)
    }))
  }, [])


//Settings Update
const updateSettings = useCallback((patch) => {
  setSettings((prev) => ({ ...prev, ...patch }))
}, [])

//Calculate layout
  const layout = useMemo(() => {
    return computeLayout(settings.t, profile, sections, settings)
  }, [settings.t, settings.size, settings.fit, settings.fs, settings.lh, settings.ff, settings.ac, profile, sections])

//Ensure current page is within bounds after layout recalculation
  const currentPage = Math.max(0, Math.min(settings.page || 0, Math.max(0, (layout.pages || 1) - 1)))
  const totalPages = layout.pages || 1

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      updateSettings({ page: currentPage + 1 })
    }
  }, [currentPage, totalPages, updateSettings])

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      updateSettings({ page: currentPage - 1 })
    }
  }, [currentPage, updateSettings])

  const setPage = useCallback((p) => {
    updateSettings({ page: Math.max(0, Math.min(p, totalPages - 1)) })
  }, [totalPages, updateSettings])

  const setZoom = useCallback((fn0rVal) => {
    setSettings((prev) => {
      const nextZ = typeof fn0rVal === 'function' ? fn0rVal(prev.z) : fn0rVal
      return { ...prev, z: Math.max(0.4, Math.min(1.5, +Number(nextZ).toFixed(2))) }
    })
  }, [])

  const resetAll = useCallback(() => {
    setProfile(DEFAULT_PROFILE)
    setSections(DEFAULT_SECTIONS)
    setSettings(DEFAULT_SETTINGS)
    setActiveStep(STEP_DEFINITIONS[0].id)
    showToast('Reset all data to default.', false)
  }, [showToast])

  const currentTemplateObj = useMemo(() => {
    return TEMPLATES.find((t) => t.id === settings.t) || TEMPLATES[0]
  }, [settings.t])

  const value = {
    profile,
    sections,
    settings,
    activeStep,
    setActiveStep,
    isTemplateModalOpen,
    setIsTemplateModalOpen,
    mobileTab,
    setMobileTab,
    layout,
    currentPage,
    totalPages,
    currentTemplateObj,
    toast,
    showToast,
    updateProfile,
    updateSectionEntry,
    addSectionEntry,
    removeSectionEntry,
    updateSettings,
    setZoom,
    setPage,
    nextPage,
    prevPage,
    resetAll
  }

  return (
    <ThemeProvider currentTemplate={settings.t} currentAccent={settings.ac}>
      <CvContext.Provider value={value}>
        {children}
        </CvContext.Provider>
    </ThemeProvider>
  )
}

export const useCv = () => {
  const ctx = useContext(CvContext)
  if (!ctx) {
    throw new Error('useCv must be used within a CvProvider')
  }
}