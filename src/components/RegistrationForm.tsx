import React, { useState } from "react";
import "./RegistrationForm.css";
import EyeClosed from "../assets/icons/hide_eye.svg";
import EyeOpen from "../assets/icons/eye.svg";

export const RegistrationForm: React.FC = () => {
    console.log("🟢 RegistrationForm загружен"); // ← ДОБАВЬ ЭТУ СТРОЧКУ

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
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
        if (message) setMessage(null);
    };

    const getPasswordStrength = (pass: string) => {
        if (pass.length === 0) return "";
        if (pass.length < 6) return "weak";
        if (pass.length < 10) return "medium";
        return "strong";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (!formData.username || !formData.email || !password) {
            setMessage({text: "Заполните все поля", type: 'error'});
            setIsLoading(false);
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
                setMessage({text: "Регистрация успешна! Перенаправляем...", type: 'success'});

                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            } else {
                console.error("❌ Ошибка регистрации:", data);
                setMessage({text: `Ошибка: ${data.detail || "Неизвестная ошибка"}`, type: 'error'});
            }
        } catch (error) {
            console.error("❌ Ошибка сети:", error);
            setMessage({text: "Ошибка сети. Проверьте подключение.", type: 'error'});
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className="registration-container">
            <div className="registration-box">
                <h2 className="registration-title">Регистрация</h2>

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

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="input-label">Логин:</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Логин"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            disabled={isLoading}
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
                            disabled={isLoading}
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

                    <button
                        type="submit"
                        className="confirm-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;