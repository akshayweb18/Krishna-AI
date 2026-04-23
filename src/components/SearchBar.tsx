"use client"
import React from 'react'

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-3">
      <input
        className="input w-full"
        placeholder="Search Sanskrit, Hindi, or English..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
