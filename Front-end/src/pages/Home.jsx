import { useEffect, useState } from "react";
import axios from "axios";
import PhotoCard from "../components/cards/PhotoCard";
import FormMessage from "../components/form/FormMessage";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const Home = () => {
    const [photos, setPhotos] = useState([]);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/photo`);
                console.log('Fetched photos:', response.data); 
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPhotos();
    }, []);

    const handleDelete = (slug) => {
        console.log('Deleting photo with slug:', slug); 
        setPhotos(prevPhotos => prevPhotos.filter(photo => photo.slug !== slug));
    };

    const handleUpdate = (updatedPhoto) => {
        console.log('Updating photo with data:', updatedPhoto);
        setPhotos(prevPhotos => prevPhotos.map(photo => photo.slug === updatedPhoto.slug ? updatedPhoto : photo));
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/message`);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const createMessage = (newMessage) => {
        setMessages([...messages, newMessage]);
    };
    return (
        <>
            {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
            <FormMessage onCreate={createMessage}/>
        </>
    );
};

export default Home;
