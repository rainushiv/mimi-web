import * as React from 'react';
import { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import './UserLostCardCard.css'
import DeleteModal from '../../Lost/Components/util/DeleteModal';
import useHttpClient from '../../Shared/hooks/HttpHook';
import LoadingSpinner from '../../Lost/UI/LoadingSpinner';
import { useContext } from 'react';
import { AuthContext } from '../../Shared/context/authContext';

export default function OverflowCard({ name, id, image, place, onDelete }) {
    const auth = useContext(AuthContext)
    const { isLoading, isError, sendRequest, clearError } = useHttpClient();
    const [modal, setIsModal] = useState(false);

    const showModal = () => {
        setIsModal(true)
    }
    const closeModal = () => {

        setIsModal(false)
    }

    const confirmDeleteHandler = async () => {
        setIsModal(false)

        try {

            await sendRequest(
                `http://localhost:4000/api/lost/${id}`,
                'DELETE',
                null, {

                Authorization: 'Bearer ' + auth.token
            }
            )
            onDelete(id);
        } catch (err) {


        }

    }




    return (
        <>
            <DeleteModal isOpen={modal} onCancel={closeModal} onConfirmDelete={confirmDeleteHandler}></DeleteModal>

            {isLoading && <LoadingSpinner asOverlay />}
            <Card variant="outlined" sx={{ width: 220 }}>
                <Link to={`/${id}/lostCat`}>
                    <CardOverflow>
                        <AspectRatio ratio="1.75">
                            <img
                                src={`http://localhost:4000/${image}`}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                    </CardOverflow>
                    <CardContent>
                        <Typography level="title-md">{name}</Typography>
                        <Typography level="body-sm">{place}</Typography>
                    </CardContent>
                </Link>
                <div className='card-ButtonContainer'>
                    <Link to={`http://localhost:3000/${id}/updatelostcat`}>

                        <button>edit</button>
                    </Link>
                    <button onClick={showModal}>delete</button>
                </div>


            </Card >

        </>
    );
}