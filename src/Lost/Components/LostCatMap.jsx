"use client";
import './LostCatMap.css'
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';


export default function LostCatMap({ currentCat }) {

    const position = {
        lat: currentCat.location.lat,
        lng: currentCat.location.lng
    };

    const ContainerStyles = {
        height: '275px',
        width: '1200px',


    }
    const circleOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        zIndex: 1,
    };

    return (
        <div className="google-map"><iframe align='center' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6961.230660546483!2d-74.00424173032792!3d40.72814218806024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599202736d41%3A0x4f926043296fda7a!2sMIMI!5e0!3m2!1sen!2sus!4v1720729559203!5m2!1sen!2sus" width="1200" height="275" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
    );
}