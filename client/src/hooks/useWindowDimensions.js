import { useState, useEffect, useCallback } from 'react'

/**
 * 
 * @returns {Object} { width, height }
 * 
 * @description Hook to get the window dimensions and update them on resize
 * 
 */
export const useWindowDimensions = () => {
    // Check if window is defined
    const hasWindow = typeof window !== 'undefined'

    // Get the window dimensions
    const getWindowDimensions = useCallback(() => {
        const width = hasWindow ? window.innerWidth : null
        const height = hasWindow ? window.innerHeight : null
        return {
            width,
            height,
        }
    }, [hasWindow])
    // Set the state windowDimensions to the window dimensions
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    // Add an event listener to the window to update the window dimensions on resize
    useEffect(() => {
        // Check if window is defined
        if (hasWindow) {
            // Update the window dimensions on resize
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions())
            }
            // Add the event listener
            window.addEventListener('resize', handleResize)
            // Remove the event listener on unmount
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [hasWindow, setWindowDimensions, getWindowDimensions])

    return windowDimensions
}