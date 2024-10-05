import { useContext, useEffect, useState } from "react"
import Header from "../../Shared/Components/Header"
import UserInfoContainer from "../Components/UserInfoContainer"
import { AuthContext } from "../../Shared/context/authContext"
import useHttpClient from "../../Shared/hooks/HttpHook"
import UserLostCatList from '../Components/UserLostCatList'
import './Profile.css'
import { current } from "@reduxjs/toolkit"
export default function Profile() {

    const auth = useContext(AuthContext)
    const { sendRequest, isError, isLoading, clearError } = useHttpClient();

    const [userCats, setUserCats] = useState();
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {

        const fetchRequest = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:4000/api/lost/user/${auth.userId}`)
                setUserCats(responseData.lostCats)
            }
            catch (err) { }
        }

        fetchRequest();

    }, [sendRequest, auth])

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:4000/api/user/${auth.userId}`)
                setCurrentUser(responseData.user)
            }
            catch (err) {

            }

        }

        fetchRequest();
        console.log(currentUser)

    }, [sendRequest, auth.userId])

    const deletePlaceHandler = (deletedId) => {
        setUserCats(prevCats => {

            prevCats.filter(userCat => userCat.id !== deletedId)
        })

    }


    return (

        <>
            <Header></Header>
            <div className="profile-ContentContainer">
                <div className="user-Container">

                    {!isLoading && currentUser && <h1>{currentUser.name}</h1>}

                    {!isLoading && currentUser && <UserInfoContainer user={currentUser}></UserInfoContainer>}


                </div>
                <div >

                    {!isLoading && userCats && <UserLostCatList items={userCats} onDelete={deletePlaceHandler}></UserLostCatList>}
                </div>
            </div>


        </>
    )
}