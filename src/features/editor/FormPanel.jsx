import React, { useRef } from 'react'
import { useCv } from '@/context/CvContext'
import { STEP_DEFINITIONS } from '@/config/constants'
import { executeExport } from '@/lib/exportUtils'

export default function FormPanel() {
  const {
    profile,
    sections,
    activeStep,
    setActiveStep,
    updateProfile,
    updateSectionEntry,
    addSectionEntry,
    removeSectionEntry,
    settings,
    showToast
  } = useCv()

  const fbodyRef = useRef(null)
  const currentStepDef = STEP_DEFINITIONS[activeStep]

  const handleNext = () => {
    if (activeStep < STEP_DEFINITIONS.length - 1) {
      setActiveStep(activeStep + 1)
      if (fbodyRef.current) fbodyRef.current.scrollTop = 0
    } else {
      // Last step: "Finish & download"
      executeExport('pdf', { profile, sections, settings, showToast })
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
      if (fbodyRef.current) fbodyRef.current.scrollTop = 0
    }
  }

  const handleAddEntry = (sectionKey) => {
    addSectionEntry(sectionKey)
    setTimeout(() => {
      if (fbodyRef.current) {
        fbodyRef.current.scrollTop = fbodyRef.current.scrollHeight
      }
    }, 50)
  }

  return (
    <div className="left">
      {/* Steps navigation bar */}
      <div className="steps" id="steps">
        {STEP_DEFINITIONS.map((s, idx) => {
          let stepClass = ''
          if (idx === activeStep) stepClass = 'on'
          else if (idx < activeStep) stepClass = 'done'

          return (
            <button
              key={s.id}
              type="button"
              className={stepClass}
              onClick={() => {
                setActiveStep(idx)
                if (fbodyRef.current) fbodyRef.current.scrollTop = 0
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Form content scroll body */}
      <div className="fbody" id="fbody" ref={fbodyRef}>
        <h2>{currentStepDef.title}</h2>
        <p>{currentStepDef.subtitle}</p>

        {/* Profile-type step (Personal, Summary, Skills) */}
        {currentStepDef.type === 'profile' && (
          <div className="g2">
            {currentStepDef.fields.map(([fKey, fLabel, fType]) => {
              const isFull = fType === 'full' || fType === 'ta'
              const isTextarea = fType === 'ta'
              const val = profile[fKey] || ''

              return (
                <div key={fKey} className={`fld ${isFull ? 'full' : ''}`}>
                  <label htmlFor={`f_${fKey}`}>{fLabel}</label>
                  {isTextarea ? (
                    <textarea
                      id={`f_${fKey}`}
                      className="sm"
                      value={val}
                      onChange={(e) => updateProfile(fKey, e.target.value)}
                    />
                  ) : (
                    <input
                      id={`f_${fKey}`}
                      type="text"
                      value={val}
                      onChange={(e) => updateProfile(fKey, e.target.value)}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Entry-type step (Experience, Education, Projects) */}
        {currentStepDef.type === 'entries' && (
          <div>
            {sections[currentStepDef.sectionKey]?.map((item, idx) => {
              const canRemove = sections[currentStepDef.sectionKey].length > 1

              return (
                <div key={item.id} className="ecard">
                  <div className="eh">
                    <b>
                      {currentStepDef.itemSingular.charAt(0).toUpperCase() +
                        currentStepDef.itemSingular.slice(1)}{' '}
                      {idx + 1}
                    </b>
                    {canRemove && (
                      <button
                        type="button"
                        className="rm"
                        onClick={() =>
                          removeSectionEntry(currentStepDef.sectionKey, item.id)
                        }
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="g2">
                    {/* Title */}
                    <div className="fld">
                      <label htmlFor={`f_${currentStepDef.sectionKey}_${item.id}_t`}>
                        {currentStepDef.labels[0]}
                      </label>
                      <input
                        id={`f_${currentStepDef.sectionKey}_${item.id}_t`}
                        type="text"
                        value={item.t || ''}
                        onChange={(e) =>
                          updateSectionEntry(
                            currentStepDef.sectionKey,
                            item.id,
                            't',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Organization / Subtitle */}
                    <div className="fld">
                      <label htmlFor={`f_${currentStepDef.sectionKey}_${item.id}_o`}>
                        {currentStepDef.labels[1]}
                      </label>
                      <input
                        id={`f_${currentStepDef.sectionKey}_${item.id}_o`}
                        type="text"
                        value={item.o || ''}
                        onChange={(e) =>
                          updateSectionEntry(
                            currentStepDef.sectionKey,
                            item.id,
                            'o',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Dates */}
                    <div className="fld full">
                      <label htmlFor={`f_${currentStepDef.sectionKey}_${item.id}_d`}>
                        {currentStepDef.labels[2]}
                      </label>
                      <input
                        id={`f_${currentStepDef.sectionKey}_${item.id}_d`}
                        type="text"
                        value={item.d || ''}
                        onChange={(e) =>
                          updateSectionEntry(
                            currentStepDef.sectionKey,
                            item.id,
                            'd',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Details / Bullets */}
                    <div className="fld full">
                      <label htmlFor={`f_${currentStepDef.sectionKey}_${item.id}_x`}>
                        {currentStepDef.labels[3]}
                      </label>
                      <textarea
                        id={`f_${currentStepDef.sectionKey}_${item.id}_x`}
                        className="sm"
                        value={item.x || ''}
                        onChange={(e) =>
                          updateSectionEntry(
                            currentStepDef.sectionKey,
                            item.id,
                            'x',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )
            })}

            <button
              type="button"
              className="add"
              onClick={() => handleAddEntry(currentStepDef.sectionKey)}
            >
              + Add another {currentStepDef.itemSingular}
            </button>
          </div>
        )}
      </div>

      {/* Pinned Bottom Footer */}
      <div className="foot">
        <button
          type="button"
          className="btn g"
          id="back"
          style={{ visibility: activeStep > 0 ? 'visible' : 'hidden' }}
          onClick={handleBack}
        >
          Back
        </button>
        <small id="prog">
          Step {activeStep + 1} of {STEP_DEFINITIONS.length}
        </small>
        <button
          type="button"
          className="btn p"
          id="next"
          onClick={handleNext}
        >
          {activeStep === STEP_DEFINITIONS.length - 1
            ? 'Finish & download'
            : 'Next'}
        </button>
      </div>
    </div>
  )
}
