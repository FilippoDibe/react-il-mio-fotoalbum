import { useEffect, useState } from 'react';
import axios from '../../data/axiosClient.js';
import Card from '../cards/Card.jsx';
import style from './Pages.module.css';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Blog = () => {
    const [photo, setPhotos] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const { data } = await axios.get('/photo');
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching Photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    const handleDelete = async (slug) => {
        const confirmed = window.confirm('Sei sicuro di voler cancellare questo photo?');
        if (confirmed) {
            try {
                await axios.delete(`/photo/${slug}`);
                setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.slug !== slug));
            } catch (error) {
                console.error('Error deleting photo:', error);
            }
        }
    };
    return (
        <div className={style.blogContainer}>
            <h1>Blog</h1>
            <div className={style.cardContainer}>
                {photo.map((photo) => (
                    <Card key={photo.id} photo={photo} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default Blog;
