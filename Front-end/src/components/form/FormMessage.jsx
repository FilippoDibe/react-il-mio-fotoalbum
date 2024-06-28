import { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    name="senderMail"
                    placeholder="Email"
                    value={senderMail}
                    onChange={(e) => setSenderMail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    name="message"
                    placeholder="Messaggio"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Invia Messaggio</button>
        </form>
    );
};

export default FormMessage;
