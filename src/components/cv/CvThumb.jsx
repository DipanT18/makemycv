//This file is for the thumbnail view of the CV.

import React from 'react'
import { renderCvHtml } from '@/lib/cvRenderer'

export default function CvThumb({
    templateId = 'm',
    profile, 
    sections, 
    accent = '#2f4bff',
    zoom, 
    style = {},
    className = ''
}) {
    const html = renderCvHtml(templateId, profile, sections)

    const inlineStyles = {
        '--cac': accent,
        ...style
    }

    return ( 
        <div className = {`thumb ${className}`} style = {inlineStyles}>
            <div 
                style = {zoom ? { zoom } : undefined }
                dangerouslySetInnerHTML = {{ __html: html }}
            />
        </div>
    )
}

