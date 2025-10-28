import React from "react";
import "./StyleAnalysisBox.css";

interface StyleAnalysisProps {
    clothingStyle: string;
    colorPalette: string[];
    styleScore: number;
}

const StyleAnalysisBox: React.FC<StyleAnalysisProps> = ({
                                                            clothingStyle,
                                                            colorPalette = ["#A0A0A0", "#A0A0A0", "#A0A0A0"],
                                                            styleScore
                                                        }) => {
    return (
        <div className="style-analysis-box">
            <div className="box-title-wrapper">
                <h3 className="box-title">Анализ стиля</h3>
            </div>

            <div className="analysis-content">
                {/* Секция стиля одежды */}
                <div className="analysis-section">
                    <h4 className="section-title">Стиль одежды:</h4>
                    <div className="style-tag">{clothingStyle}</div>
                </div>

                {/* Секция цветовой палитры */}
                <div className="analysis-section">
                    <h4 className="section-title">Основные цвета в образе:</h4>
                    <div className="color-palette">
                        {colorPalette.map((color, index) => (
                            <div
                                key={index}
                                className="color-sample"
                                style={{ backgroundColor: color }}
                                title={`Цвет ${index + 1}: ${color}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Секция уровня стиля */}
                <div className="analysis-section">
                    <div className="style-level-box">
                        <h4 className="style-level-title">Уровень стиля</h4>
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${styleScore}%` }}
                                    role="progressbar"
                                    aria-valuenow={styleScore}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                            <span className="progress-value">
                                {styleScore}/100%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StyleAnalysisBox;