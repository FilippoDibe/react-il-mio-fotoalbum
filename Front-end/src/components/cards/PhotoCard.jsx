import React from 'react';
import styles from "./Card.module.css";
import { Link } from 'react-router-dom';

const PhotoCard = ({ photo }) => {
    const apiUrl = import.meta.env.VITE_BASE_API_URL;

    return (
        <div className={styles.photoContainer}>
            <figure className={styles.photo}>
                <img src={`${apiUrl}/images/${photo.image}`} alt={photo.title} className={styles.photoImg} />
                <figcaption className={styles.photoCaption}>
                    <h2 className={styles.photoTitle}>{photo.title}</h2>
                    <Link to={`/photo/${photo.slug}`} className={styles.photoButton}>Leggi di più</Link>
                </figcaption>
            </figure>
        </div>
    );
};

export default PhotoCard;