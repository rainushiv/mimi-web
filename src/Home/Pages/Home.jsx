import HomeCatList from "../../Shared/Components/HomeCatList";
import Header from "../../Shared/Components/Header";
import HomeContentButtons from "../Components/HomeContentButtons";
import HomeContentText from "../Components/HomeContentText";
import LoadingSpinner from "../../Lost/UI/LoadingSpinner";
import useHttpClient from "../../Shared/hooks/HttpHook";
import { API_URL } from "../../Shared/hooks/config";
import { useEffect, useState } from "react";
import './Home.css'
export default function Home() {

    const { sendRequest, isError, isLoading, clearError } = useHttpClient();

    const [lostCatData, setLostCatData] = useState()

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const responseData = await sendRequest(`${API_URL}/api/lost/lostcats`)

                setLostCatData(responseData.lostCats)

            } catch (err) {

            }

        }

        fetchUsers()
        console.log(lostCatData)

    }, [sendRequest])


    return (
        <>
            <Header></Header>
            <div className="google-map"><iframe align='center' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6961.230660546483!2d-74.00424173032792!3d40.72814218806024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599202736d41%3A0x4f926043296fda7a!2sMIMI!5e0!3m2!1sen!2sus!4v1720729559203!5m2!1sen!2sus" width="1200" height="275" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
            <HomeContentButtons></HomeContentButtons>
            <div className="HomeContent-Container">
                {isLoading && <LoadingSpinner></LoadingSpinner>}
                {!isLoading && lostCatData && < HomeCatList items={lostCatData}></HomeCatList>}
                <HomeContentText></HomeContentText>


            </div >
        </>
    )

}