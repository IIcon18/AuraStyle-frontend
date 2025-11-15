import React, { useState } from "react";
import "./LoginForm.css";
import EyeOpen from "../assets/icons/eye.svg";
import EyeClosed from "../assets/icons/hide_eye.svg";
import NewAccountButton from "./shared/Buttons/NewAccountButton";
import ConfirmButton from "./shared/Buttons/ConfirmButton";

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Сбрасываем сообщение при изменении поля
        if (message) setMessage(null);
    };

    const handleLogin = async () => {
        setIsLoading(true);
        setMessage(null);

        if (!formData.email || !formData.password) {
            setMessage({text: "Заполните все поля", type: 'error'});
            setIsLoading(false);
            return;
        }

        try {
            console.log("Отправка данных на вход...");

            const response = await fetch('http://localhost:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Успешный вход!", data);
                localStorage.setItem('authToken', data.access_token);
                setMessage({text: "Вход успешен! Перенаправляем...", type: 'success'});

                // Автоматический редирект через 1.5 секунды
                setTimeout(() => {
                    window.location.href = '/analysis';
                }, 1500);
            } else {
                console.error("❌ Ошибка входа:", data);
                setMessage({text: `Ошибка: ${data.detail || "Неверный email или пароль"}`, type: 'error'});
            }
        } catch (error) {
            console.error("❌ Ошибка сети:", error);
            setMessage({text: "Ошибка сети. Проверьте подключение.", type: 'error'});
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAccount = () => {
        window.location.href = "/register";
    };

    return (
        <div className="login-form-container">
            <div className="login-form-box">
                <h2 className="login-form-title">Authorization</h2>

                {/* Сообщение */}
                {message && (
                    <div className={`message ${message.type}`}>
                        <span>{message.text}</span>
                        <button
                            className="message-close"
                            onClick={() => setMessage(null)}
                        >
                            ×
                        </button>
                    </div>
                )}

                <div className="login-form">
                    <div className="login-form-group">
                        <label className="login-input-label">Почта:</label>
                        <input
                            type="email"
                            className="login-input-field"
                            placeholder="Почта"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="login-form-group">
                        <label className="login-input-label">Пароль:</label>
                        <div className="login-password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="login-password-field"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={togglePasswordVisibility}
                                disabled={isLoading}
                            >
                                <img
                                    src={showPassword ? EyeClosed : EyeOpen}
                                    alt={showPassword ? "Hide password" : "Show password"}
                                    width="20"
                                    height="20"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="login-buttons-container">
                        <div className="login-confirm-wrapper">
                            <ConfirmButton
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? "Вход..." : "Войти"}
                            </ConfirmButton>
                        </div>

                        <div className="login-divider"></div>

                        <NewAccountButton
                            onClick={handleCreateAccount}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;