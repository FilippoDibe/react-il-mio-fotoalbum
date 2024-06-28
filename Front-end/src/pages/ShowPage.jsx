import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteButton from '../components/deleteButton/deleteButton'; 
import UpdateButton from '../components/deleteButton/updateButton';
import FormPhoto from '../components/form/FormPhoto';

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
                setPhoto(res.data); 
                setIsFormVisible(false); 
                navigate(`/photo/${res.data.slug}`);
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
        <div>
            <h1>{photo.title}</h1>
            <img src={photo.image} alt={photo.title} />
            <p>{photo.description}</p>
            <div>
                <strong>Categorie:</strong>
                <ul>
                    {photo.categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
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
