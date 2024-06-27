import style from './buttonStyle.module.css';
import { FaEdit } from 'react-icons/fa';

const UpdateButton = ({ onClick }) => {
    return (
        <button className={style.edit} onClick={onClick}>
            <FaEdit />
        </button>
    );
};

export default UpdateButton;
