import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Pages.module.css";

export default function LoginPage() {
    const { login } = useAuth();

    const initialData = {
        email: '',
        password: ''
    };
    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData);
            setFormData(initialData);
        } catch (err) {
            setLoginError(err);
        }
    }

    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => changeData('email', e.target.value)}
                    className={styles.loginInput}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={e => changeData('password', e.target.value)}
                    className={styles.loginInput}
                />
                {loginError !== null && <div className={styles.loginError}>{loginError.message}</div>}
                {loginError?.errors && loginError.errors.map((err, index) => (
                    <div key={`err${index}`} className={styles.loginError}>{err.msg}</div>
                ))}
                <button type="submit" className={styles.loginButton}>Loggati</button>
            </form>
        </div>
    );
}
