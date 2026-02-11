import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Spinner className='w-12 h-12' />
    </div>
  )
}
