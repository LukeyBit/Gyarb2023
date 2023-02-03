import React from 'react'
import secureLocalStorage from 'react-secure-storage'
import { BiPencil } from 'react-icons/bi'

const Settings = () => {
    const user = secureLocalStorage.getItem('user')
    return (
        <div className='w-[35vw] mt-8'>
            <h1 className='ml-5 mb-5 title-font text-2xl'>{user.username}</h1>
            <div>
                <h1 className='ml-8 subtitle-font font-semibold text-xl'>Chefs credentials</h1>
                <ul>
                    <form className='ml-8' autoComplete='off'>
                        <div className='relative z-0 mt-2 ml-2 mb-6 group flex flex-row py-auto'>
                            <input type="username" name="floating_username" id="floating_username" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                            <label htmlFor="floating_user" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New username</label>
                            <BiPencil size={25} type='submit' className='text-gray-500 hover:cursor-pointer hover:text-primary self-center' />
                        </div>
                    </form>
                </ul>
            </div>
        </div>
    )
}

export default Settings