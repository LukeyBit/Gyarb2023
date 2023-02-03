import secureLocalStorage from 'react-secure-storage'
import * as userAPI from '../apis/userAPI'
import { useDispatch } from 'react-redux'


export const useAuth = async () => {
    const dispatch = useDispatch()
    try {
        const { data } = await userAPI.authUser(secureLocalStorage.getItem('token'))
        if (data.success) return true
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
        return false
    }
}