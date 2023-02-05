import secureLocalStorage from 'react-secure-storage'
import * as userAPI from '../apis/userAPI'


const checkAuth = async () => {
    try {
        const { data } = await userAPI.authUser(secureLocalStorage.getItem('token'))
        if (data.success) return true
    } catch (error) {
        
        return false
    }
}

export default checkAuth