

const CardText = ({ title, content, slug, onDelete }) => {


    return (
        <div>
            <h4 className={cardStyle.title}><strong>{title}</strong></h4>
            <p className={cardStyle.text}>{content}</p>
            <Link to={`/post/${slug}`} className={cardStyle.button}>Leggi di più</Link>
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