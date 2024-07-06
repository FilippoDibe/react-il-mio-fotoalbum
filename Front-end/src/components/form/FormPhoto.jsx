import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Form.module.css";

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
    const [imageFile, setImageFile] = useState(null);

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
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setImageFile(files[0]);
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleCategoryChange = (categoryId) => {
        setCategories(prevCategories => prevCategories.map(cat =>
            cat.id === categoryId ? { ...cat, checked: !cat.checked } : cat
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('visible', formData.visible);
            formDataToSend.append('userId', formData.userId);
            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }
            formDataToSend.append('categories', JSON.stringify(categories.filter(cat => cat.checked).map(cat => cat.id)));

            console.log('Sending data:', {
                title: formData.title,
                description: formData.description,
                visible: formData.visible,
                userId: formData.userId,
                image: imageFile,
                categories: JSON.stringify(categories.filter(cat => cat.checked).map(cat => cat.id))
            });

            onSubmit(formDataToSend);
        } catch (error) {
            console.error('Error creating photo:', error);
        }
    };

    return (
        <div className={styles.photoModal}>
            <div className={styles.photoModalContent}>
                <button onClick={onClose} className={styles.photoCloseButton}>X</button>
                <form onSubmit={handleSubmit} className={styles.photoForm} encType="multipart/form-data">
                    <div className={styles.photoFormGroup}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Titolo del blog"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className={styles.photoInput}
                        />
                    </div>
                    <div className={styles.photoFormGroup}>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            className={styles.photoInput}
                        />
                    </div>
                    <div className={styles.photoFormGroup}>
                        <textarea
                            name="description"
                            placeholder="Descrizione del blog"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className={styles.photoTextarea}
                        ></textarea>
                    </div>
                    <div className={`${styles.photoFormGroup} ${styles.photoCheckboxGroup}`}>
                        <p>Categorie:</p>
                        {categories.map((category) => (
                            <label key={category.id} className={styles.photoCheckboxLabel}>
                                <input
                                    type="checkbox"
                                    name="categories"
                                    checked={category.checked}
                                    onChange={() => handleCategoryChange(category.id)}
                                    className={styles.photoCheckbox}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                    <div className={styles.photoFormGroup}>
                        <label className={styles.photoCheckboxLabel}>
                            <input
                                type="checkbox"
                                name="visible"
                                checked={formData.visible}
                                onChange={handleChange}
                                className={styles.photoCheckbox}
                            />
                            Pubblicato
                        </label>
                    </div>
                    <button type="submit" className={styles.photoButton}>Salva</button>
                </form>
            </div>
        </div>
    );
};

export default FormPhoto;
