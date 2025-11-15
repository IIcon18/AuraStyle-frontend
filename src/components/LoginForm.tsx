import React, { useState } from "react";
import "./LoginForm.css";
import EyeOpen from "../assets/icons/eye.svg";
import EyeClosed from "../assets/icons/hide_eye.svg";
import NewAccountButton from "./shared/Buttons/NewAccountButton";
import ConfirmButton from "./shared/Buttons/ConfirmButton";

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLogin = async () => {
        // Проверяем что все поля заполнены
        if (!formData.username || !formData.password) {
            alert("Заполните все поля");
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
                    email: formData.username, // твой бэкенд ожидает email для логина
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Успешный вход!", data);
                // Сохраняем токен в localStorage
                localStorage.setItem('authToken', data.access_token);
                alert("Вход успешен!");

                // Перенаправляем на главную страницу
                window.location.href = '/analysis';
            } else {
                console.error("❌ Ошибка входа:", data);
                alert(`Ошибка: ${data.detail || "Неверный логин или пароль"}`);
            }
        } catch (error) {
            console.error("❌ Ошибка сети:", error);
            alert("Ошибка сети. Проверьте подключение.");
        }
    };

    const handleCreateAccount = () => {
        window.location.href = "/register";
    };

    return (
        <div className="login-form-container">
            <div className="login-form-box">
                <h2 className="login-form-title">Authorization</h2>

                <div className="login-form">
                    <div className="login-form-group">
                        <label className="login-input-label">Почта/логин:</label>
                        <input
                            type="text"
                            className="login-input-field"
                            placeholder="Почта"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
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
                            />
                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={togglePasswordVisibility}
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
                            <ConfirmButton onClick={handleLogin} />
                        </div>

                        <div className="login-divider"></div>

                        <NewAccountButton onClick={handleCreateAccount} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;