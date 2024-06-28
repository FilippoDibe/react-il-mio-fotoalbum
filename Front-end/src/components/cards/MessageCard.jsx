import styles from "./Card.module.css";

const CardMessage = ({ message, onDelete }) => {
    return (
        <div className={styles.messageCard}>
            <p><strong>{message.senderMail}</strong></p>
            <p>{message.message}</p>
            <button 
                onClick={() => onDelete(message.id)} 
                className={styles.messageButton}
            >
                Delete
            </button>
        </div>
    );
};

export default CardMessage;
