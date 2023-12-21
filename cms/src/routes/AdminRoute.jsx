import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, empty, fromStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import http from "../http"
import { clearUser, setUser } from "../store"

export const AdminRoute = ({element}) => {

    const user = useSelector(st => st.user.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(empty(user)){
            const token = fromStorage('cms_token')

            if(!empty(token)) {
                http.get('profile/details')
                    .then(({data})=>{
                        dispatch(setUser(data))

                        if(data.type == 'Staff')
                            navigate('/')
                    })
                    .catch(err => {
                        dispatch(clearUser())
                        clearStorage('cms_token')
                    })
            }else {
                navigate('/login')
            }
        }else{
            if(user.type == 'Staff')
                navigate('/')
        }
    }, [user])

    return element
}