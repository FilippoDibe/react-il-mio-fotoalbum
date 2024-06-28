import { useState } from 'react';
import axios from 'axios';
import styles from "./Form.module.css";

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
        <form onSubmit={handleSubmit} className={styles.categoryForm}>
            <div className={styles.categoryFormGroup}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome della categoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.categoryInput}
                />
            </div>
            <button type="submit" className={styles.categoryButton}>Crea Categoria</button>
        </form>
    );
};

export default CategoryForm;
