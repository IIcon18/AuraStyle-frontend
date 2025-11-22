import React, { useState, useEffect } from "react";
import "./ProfileForm.css";
import UserIcon from "../assets/icons/profile.svg";
import PenIcon from "../assets/icons/pen.svg";
import LogoutButton from "./shared/Buttons/LogoutButton";

interface AnalysisHistoryItem {
    id: string;
    date: string;
    style: string;
}

interface UserData {
    id: number;
    username: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
}

const ProfileForm: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
    const [avatarLoading, setAvatarLoading] = useState(false);

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
                } else {
                    throw new Error('Ошибка загрузки данных пользователя');
                }

                // Загружаем историю анализов
                const analysisResponse = await fetch('http://localhost:8000/api/v1/analysis/history', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (analysisResponse.ok) {
                    const realHistory = await analysisResponse.json();
                    setAnalysisHistory(realHistory);
                } else {
                    // Если эндпоинта нет - оставляем пустой массив
                    setAnalysisHistory([]);
                }

            } catch (error) {
                console.error('Ошибка загрузки профиля:', error);
                setError('Не удалось загрузить данные профиля');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleViewAnalysis = (id: string) => {
        console.log("Просмотр анализа:", id);
        // TODO: Переход на страницу деталей анализа
    };

    const handleLogout = () => {
        console.log("Выход из профиля");
        localStorage.removeItem('authToken');
        window.location.href = "/login";
    };

    const handleChangeAvatar = async () => {
        // Создаем input элемент для выбора файла
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            try {
                setAvatarLoading(true);
                setMessage(null);

                const token = localStorage.getItem('authToken');
                if (!token) {
                    setMessage({text: 'Необходимо авторизоваться', type: 'error'});
                    return;
                }

                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('http://localhost:8000/api/v1/users/me/avatar', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    setUserData(updatedUser);
                    setMessage({text: 'Аватар успешно обновлен!', type: 'success'});

                    // Автоматически скрываем сообщение через 3 секунды
                    setTimeout(() => {
                        setMessage(null);
                    }, 3000);
                } else {
                    const errorData = await response.json();
                    setMessage({text: `Ошибка: ${errorData.detail || 'Не удалось загрузить аватар'}`, type: 'error'});
                }
            } catch (error) {
                console.error('Ошибка загрузки аватара:', error);
                setMessage({text: 'Ошибка загрузки аватара', type: 'error'});
            } finally {
                setAvatarLoading(false);
            }
        };

        input.click();
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
                    {/* Сообщения */}
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

                    {/* Блок информации профиля */}
                    <div className="profile-box profile-info-box">
                        <div className="profile-box-header">Профиль</div>
                        <div className="profile-box-content">
                            <div className="avatar-section">
                                {userData?.avatar_url ? (
                                    <img
                                        src={`http://localhost:8000${userData.avatar_url}`}
                                        alt="Аватар"
                                        className="avatar-image"
                                    />
                                ) : (
                                    <img
                                        src={UserIcon}
                                        alt="Аватар"
                                        className="avatar-icon"
                                    />
                                )}
                                <button
                                    className="change-avatar-btn"
                                    onClick={handleChangeAvatar}
                                    disabled={avatarLoading}
                                    type="button"
                                >
                                    <img src={PenIcon} alt="Изменить" className="pen1-icon" />
                                    {avatarLoading ? "Загрузка..." : "Изменить аватарку"}
                                </button>
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