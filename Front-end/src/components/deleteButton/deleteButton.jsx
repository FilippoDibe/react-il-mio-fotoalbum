import style from './buttonStyle.module.css';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BASE_API_URL;

const DeleteButton = ({ slug, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/photo/${slug}`);
            onDelete(slug); 
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <button className={style.trash} onClick={handleDelete}>
            <FaTrash />
        </button>
    );
};

export default DeleteButton;
