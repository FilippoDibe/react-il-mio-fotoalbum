import cardStyle from "./Card.module.css";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../../data/axiosClient';

const CardText = ({ title, description, slug, onDelete }) => {
    const handleDelete = async (slug) => {
        const confirmed = window.confirm('Sei sicuro di voler cancellare questo post?');
        if (confirmed) {
            try {
                await axios.delete(`/photo/${slug}`);
                setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.slug !== slug));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return (
        <div>
            <h4 className={cardStyle.title}><strong>{title}</strong></h4>
            <p className={cardStyle.text}>{description}</p>
            <Link to={`/photo/${slug}`} className={cardStyle.button}>Leggi di più</Link>
            <button className={cardStyle.edit}>
                <FaEdit />
            </button>
            <button className={cardStyle.trash} onClick={handleDelete}>
                <FaTrash />
            </button>
        </div>
    );
}

export default CardText;
