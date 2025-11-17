import React, { useState, useEffect } from "react";
import "./ProfileForm.css";
import UserIcon from "../assets/icons/profile.svg";
import PenIcon from "../assets/icons/pen.svg";
import LogoutButton from "./shared/Buttons/LogoutButton";

interface AnalysisHistoryItem {
    id: string;
    date: string;
    style: string;
    // Добавь другие поля которые возвращает бэкенд
}

interface UserData {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

const ProfileForm: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Загрузка данных пользователя и истории
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken');

                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                // Загружаем данные пользователя
                const userResponse = await fetch('http://localhost:8000/api/v1/users/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUserData(userData);
                } else if (userResponse.status === 401) {
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    return;
                }

                // 🔥 ЗАГРУЗКА РЕАЛЬНОЙ ИСТОРИИ АНАЛИЗОВ
                // TODO: Добавь эндпоинт для истории анализов
                // const analysisResponse = await fetch('http://localhost:8000/api/v1/analysis/history', {
                //     method: 'GET',
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //     },
                // });

                // if (analysisResponse.ok) {
                //     const realHistory = await analysisResponse.json();
                //     setAnalysisHistory(realHistory);
                // } else {
                //     // Если эндпоинта нет - оставляем пустой массив
                //     setAnalysisHistory([]);
                // }

            } catch (error) {
                console.error('Ошибка загрузки профиля:', error);
                setError('Не удалось загрузить данные профиля');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []); // 🔥 Пустой массив зависимостей - загружается только при монтировании

    // Временные демо-данные (удали когда будет реальный эндпоинт)
    useEffect(() => {
        if (!loading && analysisHistory.length === 0) {
            // 🔥 УБЕРИ ЭТИ ДЕМО-ДАННЫЕ КОГДА БУДЕТ РЕАЛЬНЫЙ ЭНДПОИНТ
            setAnalysisHistory([]); // ← СДЕЛАЙ ПУСТЫМ МАССИВОМ ЧТОБЫ УБРАТЬ ДЕМО-ДАННЫЕ
        }
    }, [loading, analysisHistory.length]);

    const handleViewAnalysis = (id: string) => {
        console.log("Просмотр анализа:", id);
        // TODO: Переход на страницу деталей анализа
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
                            {analysisHistory.length > 0 ? (
                                analysisHistory.map((item) => (
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
                                ))
                            ) : (
                                <div className="no-history">
                                    История анализов пуста
                                </div>
                            )}
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