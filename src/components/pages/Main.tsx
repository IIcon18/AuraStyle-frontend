import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import UploadImageBox from "../UploadImageBox";
import StyleAnalysisBox from "../StyleAnalysisBox";
import ResetButton from "../shared/Buttons/ResetButton";
import ProfileIcon from "../../assets/icons/profile.svg";

const Main: React.FC = () => {
    const navigate = useNavigate();

    const analysisData = {
        clothingStyle: "Спортивный",
        colorPalette: ["#A0A0A0", "#A0A0A0", "#A0A0A0"],
        styleScore: 70
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleReset = () => {
        console.log("Сброс анализа");
        // Логика сброса анализа
    };

    return (
        <div className="main-page">
            <div className="header-with-icon">
                <Header />
                <button
                    className="profile-button-main"
                    onClick={handleProfileClick}
                    aria-label="Перейти в профиль"
                >
                    <img
                        src={ProfileIcon}
                        alt="Профиль"
                        className="profile-icon-main"
                    />
                </button>
            </div>

            <main className="main-content">
                <div className="main-container">
                    <div className="boxes-row">
                        <UploadImageBox />

                        {/* НОВАЯ СТРУКТУРА: блок анализа + кнопка сброса */}
                        <div className="analysis-with-reset">
                            <StyleAnalysisBox {...analysisData} />
                            <div className="reset-button-container">
                                <ResetButton onClick={handleReset} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Main;