import React from "react";
import "./ProfileForm.css";
import UserIcon from "../assets/icons/profile.svg";
import PenIcon from "../assets/icons/pen.svg";
import LogoutButton from "./shared/Buttons/LogoutButton";

interface AnalysisHistoryItem {
    date: string;
    style: string;
    id: string;
}

const ProfileForm: React.FC = () => {
    const analysisHistory: AnalysisHistoryItem[] = [
        { date: "15 мая 2025", style: "Классический Стиль", id: "1" },
        { date: "10 мая 2025", style: "Винтажный Стиль", id: "2" },
        { date: "5 мая 2025", style: "Спортивный", id: "3" }
    ];

    const handleViewAnalysis = (id: string) => {
        console.log("Просмотр анализа:", id);
    };

    const handleLogout = () => {
        console.log("Выход из профиля");
        window.location.href = "/login";
    };

    const handleChangeAvatar = () => {
        console.log("Изменение аватарки");
    };

    return (
        <div className="profile-form-container">
            <div className="profile-content">

                <div className="profile-box history-box">
                    <h2 className="box1-title">История анализа</h2>
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


                <div className="profile-box profile-info-box">
                    <h2 className="box2-title">Профиль</h2>
                    <div className="avatar-section">
                        <img src={UserIcon} alt="Аватар" className="avatar-icon" />
                        <span
                            className="change-avatar"
                            onClick={handleChangeAvatar}
                        >
                            <img src={PenIcon} alt="Изменить" className="pen-icon" />
                            Изменить аватарку
                        </span>
                    </div>

                    <div className="welcome-section">
                        <div className="welcome-text">Добро пожаловать,</div>
                        <div className="username">@username</div>
                    </div>

                    <LogoutButton onClick={handleLogout} absolute={true} />
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;