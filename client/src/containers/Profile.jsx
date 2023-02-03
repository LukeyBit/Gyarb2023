import React from 'react'
import { Settings, Preferences  } from '../components'

const Profile = () => {
  return (
    <div className='flex h-screen'>
      <Settings/>
      <Preferences/>
    </div>
  )
}

export default Profile