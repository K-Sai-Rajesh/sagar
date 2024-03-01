import { Navigate } from "react-router-dom"
import Dashboard from "./Dashboard"
import { useSelector } from "react-redux"

export default function Auth(props) {
    // const { acceptCookies } = props
    const { token } = useSelector(state => state.LoginReducer)
    return (
        <>
            {
                token === null ?
                    <Navigate to={'/signin'} replace={true} />
                    :
                    <Dashboard />
            }
        </>
    )
}