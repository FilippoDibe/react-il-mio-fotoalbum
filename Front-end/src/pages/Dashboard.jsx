import { useState } from 'react';
import axios from 'axios';
import FormPhoto from '../components/form/FormPhoto';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const Dashboard = () => {
    const navigate = useNavigate();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const createPhoto = async (formData) => {
        try {
            console.log('Sending data:', formData);  // Stampa di debug
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
        </div>
    );
};

export default Dashboard;
