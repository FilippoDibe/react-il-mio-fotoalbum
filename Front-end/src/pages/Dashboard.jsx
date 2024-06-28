import { useState, useEffect } from 'react';
import axios from 'axios';
import FormPhoto from '../components/form/FormPhoto';
import CategoryForm from '../components/form/FormCategory';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const Dashboard = () => {
    const navigate = useNavigate();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/category`);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
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
        </div>
    );
};

export default Dashboard;

