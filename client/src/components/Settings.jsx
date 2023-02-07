import React, { useState, useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { updatePassword } from '../store/actions/userActions'
import { BiPencil } from 'react-icons/bi'

const Settings = () => {
    const user = secureLocalStorage.getItem('user')
    const [credentials, setCredentials] = useState({ password: '', oldPassword: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const inputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (credentials.oldPassword !== '' || credentials.password !== '') {
          dispatch({ type: 'CLEAR' })
        }
      }


    const handlePasswordSubmit = (e) => {
        e.preventDefault()

        if (credentials.password === '') {
            dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in all fields' } })
        } else {
            dispatch(updatePassword(credentials))
        }
    }

    return (
        <div className='w-[35vw] mt-8'>
            <h1 className='ml-5 mb-5 title-font text-2xl'>{user.username}</h1>
            <div>
                <h1 className='ml-8 subtitle-font font-semibold text-xl'>Chefs credentials</h1>
                <form className='ml-8' autoComplete='off'>
                    <div className='relative z-0 mt-2 ml-2 mb-6 group flex flex-row py-auto'>
                        <input type="username" name="floating_username" id="floating_username" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
                        <label htmlFor="floating_user" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New username</label>
                        <BiPencil size={25} type='submit' className='text-gray-500 hover:cursor-pointer hover:text-primary self-center' />
                    </div>
                </form>
                <form className='ml-8' autoComplete='off' onSubmit={handlePasswordSubmit}>
                    <div className='relative z-0 mt-2 ml-2 mb-6 group flex flex-row py-auto'>
                        <input type="password" name="password" id="password" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " onChange={inputChange}/>
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New password</label>
                    </div>
                    <div className='relative z-0 mt-2 ml-2 mb-6 group flex flex-row py-auto'>
                        <input type="password" name="oldPassword" id="oldPassword" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " onChange={inputChange}/>
                        <label htmlFor="oldPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Old password</label>
                        <button className='settings__button' type='submit'>
                            <BiPencil size={25} className='text-gray-500 hover:cursor-pointer hover:text-primary self-center' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings