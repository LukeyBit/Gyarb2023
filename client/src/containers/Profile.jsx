import React from 'react'
import { Settings, Preferences  } from '../components'

const Profile = () => {
  return (
    <div className='flex flex-col lg:flex-row'>
      <Settings/>
      <Preferences/>
    </div>
  )
}

export default Profile