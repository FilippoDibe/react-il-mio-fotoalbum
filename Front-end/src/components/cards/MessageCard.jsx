import cardStyle from "./Card.module.css";
import { FaTrash, FaEdit } from 'react-icons/fa';
// import { Link } from 'react-router-dom';


const MessageCard = ({ title, content, slug, onDelete }) => {


    return (
        <div className={cardStyle.container}>
            <h4 className={cardStyle.title}><strong></strong></h4>
            <p className={cardStyle.text}></p>
            {/* <Link to={`/post/${slug}`} className={cardStyle.button}>Leggi di più</Link> */}
        </div>
    );
}

export default MessageCard;