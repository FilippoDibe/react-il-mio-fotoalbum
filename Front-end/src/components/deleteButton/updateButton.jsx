import style from './buttonStyle.module.css';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const UpdateButton = ({ onClick }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <button className={style.edit} onClick={onClick}>
            <FaEdit className={style.icon} />
        </button>
    );
};

export default UpdateButton;

