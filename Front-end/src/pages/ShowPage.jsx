import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from '../components//deleteButton/deleteButton'; 
import UpdateButton from '../components/deleteButton/updateButton';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const ShowPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/photo/${slug}`);
                setPhoto(data);
            } catch (error) {
                console.error('Error fetching photo:', error);
            }
        };

        fetchPhoto();
    }, [slug]);

    const handleDelete = () => {
        navigate('/'); // Redirect to the home page after successful deletion
    };

    if (!photo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{photo.title}</h1>
            <img src={photo.image} alt={photo.title} />
            <p>{photo.content}</p>
            <div>
                <strong>Categorie:</strong>
                <ul>
                    {photo.categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            </div>
            <UpdateButton/>
            <DeleteButton slug={slug} onDelete={handleDelete} />
        </div>
    );
};

export default ShowPage;
