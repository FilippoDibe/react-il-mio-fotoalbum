import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const FormPhoto = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        visible: false,
        categories: [],
        userId: 3 
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/category`);
                const categoriesWithChecked = data.map(category => ({
                    ...category,
                    checked: initialData ? initialData.categories.some(cat => cat.id === category.id) : false
                }));
                setCategories(categoriesWithChecked);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryChange = (categoryId) => {
        setCategories(prevCategories => prevCategories.map(cat =>
            cat.id === categoryId ? { ...cat, checked: !cat.checked } : cat
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                title: formData.title,
                description: formData.description,
                image: formData.image,
                visible: formData.visible,
                categories: categories.filter(cat => cat.checked).map(cat => cat.id),
                userId: formData.userId
            };
            console.log('Sending data:', updatedFormData);  // Stampa di debug
            onSubmit(updatedFormData);
        } catch (error) {
            console.error('Error updating photo:', error);
        }
    };

    return (
        <div>
            <div>
                <button onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            placeholder="Titolo del blog"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="image"
                            placeholder="URL dell'immagine"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            placeholder="Descrizione del blog"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group checkbox-group">
                        <p>Categorie:</p>
                        {categories.map((category) => (
                            <label key={category.id}>
                                <input
                                    type="checkbox"
                                    name="categories"
                                    checked={category.checked}
                                    onChange={() => handleCategoryChange(category.id)}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="visible"
                                checked={formData.visible}
                                onChange={handleChange}
                            />
                            Pubblicato
                        </label>
                    </div>
                    <button type="submit">Salva</button>
                </form>
            </div>
        </div>
    );
};

export default FormPhoto;
