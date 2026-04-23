"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const ChapterControls = dynamic(() => import('./ChapterControls'), { ssr: false })

export default function ChapterControlsClient(props: any) {
  return <ChapterControls {...props} />
}
