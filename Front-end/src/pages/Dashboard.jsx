import { useState, useEffect } from 'react';
import axios from 'axios';
import FormPhoto from '../components/form/FormPhoto';
import CategoryForm from '../components/form/FormCategory';
import CardMessage from '../components/cards/MessageCard';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const Dashboard = () => {
    const navigate = useNavigate();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchMessages();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/category`);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/message`);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const createPhoto = async (formData) => {
        try {
            const res = await axios.post(`${apiUrl}/photo`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status < 400) {
                navigate(`/photo/${res.data.slug}`);
            }
        } catch (error) {
            console.error('Error creating photo:', error);
        }
    };

    const createCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`${apiUrl}/category/${categoryId}`);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            await axios.delete(`${apiUrl}/message/${messageId}`);
            setMessages(messages.filter(message => message.id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setIsFormVisible(!isFormVisible)}>Aggiungi Nuova Foto</button>
            {isFormVisible && (
                <FormPhoto 
                    initialData={null} 
                    onSubmit={createPhoto} 
                    onClose={() => setIsFormVisible(false)} 
                />
            )}
            <h2>Gestione Categorie</h2>
            <CategoryForm onCreate={createCategory} />
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => deleteCategory(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Messaggi</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <CardMessage message={message} onDelete={deleteMessage} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
