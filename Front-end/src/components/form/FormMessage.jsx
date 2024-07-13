import { useState } from 'react';
import axios from 'axios';
import style from "./Form.module.css";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

const FormMessage = ({ onCreate }) => {
    const [senderMail, setSenderMail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${apiUrl}/message`, { senderMail, message });
            onCreate(data);
            setSenderMail('');
            setMessage('');
        } catch (error) {
            console.error('Error creating message:', error);
        }
    };

    return (
       <>
        <div className={style.messageFormContainer}>
            <form onSubmit={handleSubmit} className={style.messageForm}>
                <h1>Contattami</h1>
                <div className={style.messageFormGroup}>
                    <input
                        type="email"
                        name="senderMail"
                        placeholder="Email"
                        value={senderMail}
                        onChange={(e) => setSenderMail(e.target.value)}
                        required
                        className={style.messageInput}
                    />
                </div>
                <div className={style.messageFormGroup}>
                    <textarea
                        name="message"
                        placeholder="Messaggio"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className={style.messageTextarea}
                    ></textarea>
                </div>
                <button type="submit" className={style.messageButton}>Invia Messaggio</button>
            </form>
        </div>
       </>
    );
};


export default FormMessage;
