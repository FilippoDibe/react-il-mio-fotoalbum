const CardMessage = ({ message, onDelete }) => {
    return (
        <div className="card">
            <p><strong>{message.senderMail}</strong></p>
            <p>{message.message}</p>
            <button onClick={() => onDelete(message.id)}>Delete</button>
        </div>
    );
};

export default CardMessage;
