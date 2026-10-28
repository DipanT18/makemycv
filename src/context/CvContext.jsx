import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import {
  DEFAULT_PROFILE,
  DEFAULT_SECTIONS,
  DEFAULT_SETTINGS,
  TEMPLATES
} from '@/config/constants'
import { computeLayout } from '@/lib/pagination'
import { ThemeProvider } from './ThemeContext'

const STORAGE_KEY = 'makecv:v2'

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
          proj: Array.isArray(parsed.sections?.proj) ? parsed.sections.proj : DEFAULT_SECTIONS.proj
        },
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) }
      }
    }
  } catch (_) {}
  return {
    profile: DEFAULT_PROFILE,
    sections: DEFAULT_SECTIONS,
    settings: DEFAULT_SETTINGS
  }
}

export function CvProvider({ children }) {
  const [initial] = useState(getInitialState)
  const [profile, setProfile] = useState(initial.profile)
  const [sections, setSections] = useState(initial.sections)
  const [settings, setSettings] = useState(initial.settings)

  const [activeStep, setActiveStep] = useState(0)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState('edit') // 'edit' | 'preview'

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', error: false })

  const showToast = useCallback((message, error = false) => {
    setToast({ show: true, message, error })
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, error ? 5000 : 2800)
    return () => clearTimeout(timer)
  }, [])

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ profile, sections, settings })
      )
    } catch (_) {}
  }, [profile, sections, settings])

  // Profile update
  const updateProfile = useCallback((field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Section entry update
  const updateSectionEntry = useCallback((section, id, field, value) => {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
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

  // Settings update
  const updateSettings = useCallback((patch) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  // Calculate layout
  const layout = useMemo(() => {
    return computeLayout(settings.t, profile, sections, settings)
  }, [settings.t, settings.size, settings.fit, settings.fs, settings.lh, settings.ff, settings.ac, profile, sections])

  // Ensure current page is in valid bounds
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

  const setZoom = useCallback((fnOrVal) => {
    setSettings((prev) => {
      const nextZ = typeof fnOrVal === 'function' ? fnOrVal(prev.z) : fnOrVal
      return { ...prev, z: Math.max(0.4, Math.min(1.5, +Number(nextZ).toFixed(2))) }
    })
  }, [])

  const resetAll = useCallback(() => {
    setProfile(DEFAULT_PROFILE)
    setSections(DEFAULT_SECTIONS)
    setSettings(DEFAULT_SETTINGS)
    setActiveStep(0)
    showToast('Reset to default CV sample')
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
  if (!ctx) throw new Error('useCv must be used within CvProvider')
  return ctx
}
