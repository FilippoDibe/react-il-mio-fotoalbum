import React, { useState } from 'react';
import cardStyle from "./Card.module.css";
import { Link } from 'react-router-dom';

const PhotoCard = ({ photo}) => {



    return (
        <div className={cardStyle.container}>
            <figure className={cardStyle.imgContain}>
                <img src={photo.image} alt={photo.title} />
            </figure>
            <h4 className={cardStyle.title}><strong>{photo.title}</strong></h4>
            <p className={cardStyle.text}>{photo.description}</p>
            <Link to={`/photo/${photo.slug}`} className={cardStyle.button}>Leggi di più</Link>
                
           
        </div>
    );
};

export default PhotoCard;
