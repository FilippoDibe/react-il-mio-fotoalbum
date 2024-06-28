import { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const CategoryForm = ({ onCreate }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${apiUrl}/category`, { name });
            onCreate(data);
            setName('');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome della categoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Crea Categoria</button>
        </form>
    );
};

export default CategoryForm;
