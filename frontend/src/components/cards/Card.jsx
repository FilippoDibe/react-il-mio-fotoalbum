import cardStyle from "./Card.module.css";
import CardText from "./CardText";
import CardImg from "./CardImg";
const Card = ({photo, onDelete}) => {
    return(
        <div className={cardStyle.container}>
            <CardImg imageUrl={photo.image} />
            <CardText 
                title={photo.title} 
                content={photo.content}
                slug={photo.slug}
                onDelete={onDelete}
                
            />

        </div>
    );
};

export default Card;