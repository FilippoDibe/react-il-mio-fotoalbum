import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../data/axiosClient.js';
import style from './Pages.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Post = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const { data } = await axios.get(`/photo/${slug}`);
                setPhoto(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPhoto();
    }, [slug]);

    const handleDelete = async (slug) => {
        const confirmed = window.confirm('Sei sicuro di voler cancellare questo post?');
        if (confirmed) {
            try {
                await axios.delete(`/photo/${slug}`);
                setPhoto((prevPhoto) => prevPhoto.filter(photo => photo.slug !== slug));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    if (!photo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.postContainer}>
            <h1>{photo.title}</h1>
            <img src={photo.image} alt={photo.title} className={style.postImage} />
            <p>{photo.content}</p>
            <div>
                <strong>Categorie:</strong>
                <ul>
                    {photo.categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            </div>
            {user && (
                <>
                    <button className={style.edit}>
                        <FaEdit />
                    </button>
                    <button className={style.trash} onClick={handleDelete}>
                        <FaTrash />
                    </button>
                </>
            )}
        </div>
    );
};

export default Post;
