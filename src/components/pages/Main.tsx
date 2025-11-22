import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import UploadImageBox from "../UploadImageBox";
import StyleAnalysisBox from "../StyleAnalysisBox";
import ResetButton from "../shared/Buttons/ResetButton";
import ProfileIcon from "../../assets/icons/profile.svg";

interface AnalysisData {
    clothingStyle: string;
    colorPalette: string[];
    styleScore: number;
}

const Main: React.FC = () => {
    const navigate = useNavigate();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleImageUpload = (file: File) => {
        setUploadedFile(file);

        // Создаем preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        console.log('Файл загружен:', file.name);

        // Анализ НЕ запускается автоматически - будет запускаться отдельной кнопкой/действием
        // AI модуль будет обрабатывать изображение позже
    };

    const handleReset = () => {
        console.log("Сброс анализа и изображения");

        // Сбрасываем все состояния
        setUploadedFile(null);
        setAnalysisData(null);
        setPreviewUrl(null);

        // Сброс input file
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
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
                        <UploadImageBox
                            onImageUpload={handleImageUpload}
                            previewUrl={previewUrl}
                        />

                        <div className="analysis-with-reset">
                            <StyleAnalysisBox
                                clothingStyle={analysisData?.clothingStyle || ""}
                                colorPalette={analysisData?.colorPalette || []}
                                styleScore={analysisData?.styleScore || 0}
                                hasData={!!analysisData}
                                hasImage={!!uploadedFile}
                            />
                            <div className="reset-button-container">
                                <ResetButton
                                    onClick={handleReset}
                                    disabled={!uploadedFile && !analysisData}
                                />
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