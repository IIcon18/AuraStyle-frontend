import React, { useState } from "react";
import "./RegistrationForm.css";
import EyeOpen from "../assets/icons/eye.svg";
import EyeClosed from "../assets/icons/hide_eye.svg";
import ConfirmButton from "./shared/Buttons/ConfirmButton";

export const RegistrationForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getPasswordStrength = (pass: string) => {
        if (pass.length === 0) return "";
        if (pass.length < 6) return "weak";
        if (pass.length < 10) return "medium";
        return "strong";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверяем что все поля заполнены
        if (!formData.username || !formData.email || !password) {
            alert("Заполните все поля");
            return;
        }

        try {
            console.log("Отправка данных на регистрацию...");

            const response = await fetch('http://localhost:8000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Успешная регистрация!", data);
                alert("Регистрация успешна! Теперь можете войти.");

                // Перенаправляем на страницу логина
                window.location.href = '/login';
            } else {
                console.error("❌ Ошибка регистрации:", data);
                alert(`Ошибка: ${data.detail || "Неизвестная ошибка"}`);
            }
        } catch (error) {
            console.error("❌ Ошибка сети:", error);
            alert("Ошибка сети. Проверьте подключение.");
        }
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className="registration-container">
            <div className="registration-box">
                <h2 className="registration-title">Регистрация</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="input-label">Логин:</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Логин"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Почта:</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Почта"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Пароль:</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input-field password-field"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                <img
                                    src={showPassword ? EyeClosed : EyeOpen}
                                    alt={showPassword ? "Hide password" : "Show password"}
                                    width="20"
                                    height="20"
                                />
                            </button>
                            {password && (
                                <div className="password-strength-bar">
                                    <div
                                        className={`password-strength-progress ${passwordStrength.toLowerCase()}`}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="divider"></div>

                    <ConfirmButton />
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;