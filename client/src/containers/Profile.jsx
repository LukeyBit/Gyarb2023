import React from 'react'
import { Settings, Preferences  } from '../components'

/**
 * 
 * @returns {JSX.Element} Profile container
 * 
 * @description This container renders the profile page
 * where the user can change their settings and preferences
 * 
 */
const Profile = () => {
  return (
    <div className='flex flex-col lg:flex-row'>
      <Settings/>
      <Preferences/>
    </div>
  )
}

export default Profile