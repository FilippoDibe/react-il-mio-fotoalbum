import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from '../components/deleteButton/deleteButton'; 
import UpdateButton from '../components/deleteButton/updateButton';
import FormPhoto from '../components/form/FormPhoto';
import { useAuth } from '../contexts/AuthContext';
import styles from "./Pages.module.css";


const apiUrl = import.meta.env.VITE_BASE_API_URL;

const ShowPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/photo/${slug}`);
                setPhoto({
                    ...data,
                    published: data.visible, // assuming `visible` is the `published` status
                    categories: data.categories.map(cat => ({ ...cat, checked: true }))
                });
            } catch (error) {
                console.error('Error fetching photo:', error);
            }
        };

        fetchPhoto();
    }, [slug]);
    const updatePhoto = async (formData) => {
        try {
            const url = `${apiUrl}/photo/${slug}`;
            const res = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status < 400) {
                setPhoto({
                    ...res.data,
                    published: res.data.visible, // update the state with the new data
                    categories: res.data.categories.map(cat => ({ ...cat, checked: true }))
                });
                setIsFormVisible(false); // hide the form after update
            }
        } catch (error) {
            console.error('Error updating photo:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/photo/${slug}`);
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    if (!photo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.showContainer}>
            <h1 className={styles.showTitle}>{photo.title}</h1>
            <img src={`${apiUrl}/images/${photo.image}`} alt={photo.title} className={styles.photoImg} />
            <p className={styles.showDescription}>{photo.description}</p>
            <div className={styles.showCategories}>
                <strong>Categorie:</strong>
                <ul className={styles.showCategoryList}>
                    {photo.categories.map((category) => (
                        <li key={category.id} className={styles.showCategoryItem}>{category.name}</li>
                    ))}
                </ul>
            </div>
            <UpdateButton onClick={() => setIsFormVisible(!isFormVisible)} />
            <DeleteButton slug={slug} onDelete={handleDelete} />
            {isFormVisible && (
                <FormPhoto 
                    initialData={photo} 
                    onSubmit={updatePhoto} 
                    onClose={() => setIsFormVisible(false)} 
                />
            )}
        </div>
    );
};


export default ShowPage;
