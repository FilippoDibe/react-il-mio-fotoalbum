import { useState, useEffect } from 'react';
import axios from '../../data/axiosClient.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './Form.css';

const Form = ({ onAddArticle }) => {
  const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: '',
        category: '',
        categories: [],
        visible: false
    });

    const [categories, setcategories] = useState([]);

    useEffect(() => {
        const fetchcategories = async () => {
            try {
                const { data } = await axios.get(`/category`);
                setcategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchcategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'visible') {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: checked
                }));
            } else {
                const newcategories = checked
                    ? [...formData.categories, parseInt(value)]
                    : formData.categories.filter((categories) => categories !== parseInt(value));
                setFormData((prevData) => ({
                    ...prevData,
                    categories: newcategories
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title.trim().length === 0) {
            return;
        }

        try {
            const response = await axios.post(`/posts`, {
                title: formData.title,
                image: formData.image,
                description: formData.description,
                visible: formData.visible,
                categoriesId: formData.categories.map(categories => parseInt(categories)),
            });

            onAddArticle(response.data);  // Chiama correttamente onAddArticle
            setFormData({
                title: '',
                image: '',
                description: '',
                categories: [],
                visible: false
            });
        } catch (error) {
            console.error('Error creating article:', error.response ? error.response.data : error);
        }
    };

  return (
    <div>
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
            name="description"
            placeholder="Contenuto del blog"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
        </div>
        <div className="form-group checkbox-group">
          <p>categories:</p>
          {categories.map((categories) => (
            <label key={categories.id}>
              <input
                type="checkbox"
                name="categories"
                value={categories.id}
                checked={formData.categories.includes(categories.id)}
                onChange={handleChange}
              />
              {categories.name}
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
        <button disabled={formData.title.trim().length === 0}>Salva</button>
      </form>
    </div>
  );
}

export default Form;
