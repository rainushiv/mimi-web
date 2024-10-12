import Header from "../../Shared/Components/Header";
import { useParams } from 'react-router-dom'
import LostCatMap from "../Components/LostCatMap";
import { API_URL } from '../../Shared/hooks/config'
import useHttpClient from "../../Shared/hooks/HttpHook";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Shared/context/authContext";
import LostPageListItem from "../Components/LostPageListItem";
export default function LostCatPage(props) {
    const [currentCat, setCurrentCat] = useState()
    const { sendRequest, isLoading, isError, clearError } = useHttpClient()

    const lostCatId = useParams().pid
    useEffect(() => {

        const fetchCat = async () => {
            try {

                const responseData = await sendRequest(`${API_URL}/api/lost/${lostCatId}`)

                setCurrentCat(responseData.lostCat)

            }
            catch (error) {

            }
        }


        fetchCat();
    }, [sendRequest, lostCatId])
    return (

        <>

            <Header />


            {!isLoading && currentCat &&
                <>
                    <LostCatMap currentCat={currentCat}></LostCatMap>

                    <LostPageListItem items={currentCat}></LostPageListItem>
                </>}
        </>
    );


}