"use client"
import defaultStates from '@/app/utils/defaultStates'
import React from 'react'

const States = () => {
    return (
        <>
            <h2 className='flex items-center text-xl font-semibold'>Top Large Cities</h2>
            <div className='flex flex-col gap-3'>
                {defaultStates.map((state, index) => {
                    return (
                        <div key={index} className='cursor-pointer rounded-lg border shadow-sm dark:bg-dark-grey dark:shadow-none'>
                            <p className='px-6 py-3 font-medium'>| {state.name}, {state.country}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default States