import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const FormPhoto = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryChange = (index) => {
        setFormData(prevState => {
            const updatedCategories = [...prevState.categories];
            updatedCategories[index].checked = !updatedCategories[index].checked;
            return { ...prevState, categories: updatedCategories };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/photo/${formData.slug}`, formData);
            console.log('Update response:', response.data);
            onSubmit(response.data); // Pass the updated data to the parent component
            onClose();
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
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="image"
                            placeholder="URL dell'immagine"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="content"
                            placeholder="Contenuto del blog"
                            value={formData.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group checkbox-group">
                        <p>Categorie:</p>
                        {formData.categories.map((category, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="categories"
                                    checked={category.checked}
                                    onChange={() => handleCategoryChange(index)}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="published"
                                checked={formData.published}
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
