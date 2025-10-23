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
        email: "", // ← ДОБАВЛЕНО ОТДЕЛЬНОЕ ПОЛЕ ДЛЯ EMAIL

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ваша логика регистрации
        console.log("Registration data:", { ...formData, password });
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
                            type="email" // ← ИЗМЕНЕНО НА type="email"
                            className="input-field"
                            placeholder="Почта"
                            value={formData.email} // ← ИСПОЛЬЗУЕТ formData.email
                            onChange={(e) => handleInputChange("email", e.target.value)} // ← СОХРАНЯЕТ В "email"
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