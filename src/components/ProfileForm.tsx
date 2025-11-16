import React, { useState, useEffect } from "react";
import "./ProfileForm.css";
import UserIcon from "../assets/icons/profile.svg";
import PenIcon from "../assets/icons/pen.svg";
import LogoutButton from "./shared/Buttons/LogoutButton";

interface AnalysisHistoryItem {
    date: string;
    style: string;
    id: string;
}

interface UserData {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

const ProfileForm: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Демо-данные истории анализов (пока что, потом заменим на реальные)
    const analysisHistory: AnalysisHistoryItem[] = [
        { date: "15 мая 2025", style: "Классический Стиль", id: "1" },
        { date: "10 мая 2025", style: "Винтажный Стиль", id: "2" },
        { date: "5 мая 2025", style: "Спортивный", id: "3" },
        { date: "1 мая 2025", style: "Минимализм", id: "4" },
        { date: "28 апреля 2025", style: "Бохо", id: "5" }
    ];

    // Загрузка данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken');

                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const response = await fetch('http://localhost:8000/api/v1/users/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);
                } else if (response.status === 401) {
                    // Неавторизован - редирект на логин
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                } else {
                    throw new Error('Ошибка загрузки данных');
                }
            } catch (error) {
                console.error('Ошибка загрузки профиля:', error);
                setError('Не удалось загрузить данные профиля');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleViewAnalysis = (id: string) => {
        console.log("Просмотр анализа:", id);
    };

    const handleLogout = () => {
        console.log("Выход из профиля");
        localStorage.removeItem('authToken');
        window.location.href = "/login";
    };

    const handleChangeAvatar = () => {
        console.log("Изменение аватарки");
        // TODO: Реализовать загрузку аватара
    };

    if (loading) {
        return (
            <div className="profile-form-container">
                <div className="loading">Загрузка профиля...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-form-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="profile-form-container">
            <div className="profile-content">
                {/* Блок истории анализов */}
                <div className="profile-box history-box">
                    <div className="profile-box-header">История анализа</div>
                    <div className="profile-box-content">
                        <div className="analysis-list">
                            {analysisHistory.map((item) => (
                                <div key={item.id} className="analysis-item">
                                    <span className="analysis-date">{item.date}</span>
                                    <span className="analysis-style">{item.style}</span>
                                    <button
                                        className="view-button"
                                        onClick={() => handleViewAnalysis(item.id)}
                                    >
                                        Просмотр
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Обертка для профиля и кнопки выхода */}
                <div className="profile-info-wrapper">
                    {/* Блок информации профиля */}
                    <div className="profile-box profile-info-box">
                        <div className="profile-box-header">Профиль</div>
                        <div className="profile-box-content">
                            <div className="avatar-section">
                                <img
                                    src={UserIcon}
                                    alt="Аватар"
                                    className="avatar-icon"
                                />
                                <span
                                    className="change-avatar"
                                    onClick={handleChangeAvatar}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChangeAvatar()}
                                >
                                    <img src={PenIcon} alt="Изменить" className="pen1-icon" />
                                    Изменить аватарку
                                </span>
                            </div>

                            <div className="welcome-section">
                                <div className="welcome-text">Добро пожаловать,</div>
                                <div className="username">
                                    @{userData?.username || 'username'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Кнопка выхода теперь отдельно под контейнером профиля */}
                    <div className="logout-button-wrapper">
                        <LogoutButton onClick={handleLogout} absolute={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;