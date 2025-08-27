import React from 'react'

interface ContentContainerProps {
  children: React.ReactNode
  className?: string
}

export function ContentContainer({ children, className = '' }: ContentContainerProps) {
  return (
    <>
      {children}
    </>
  )
}

export default ContentContainer

