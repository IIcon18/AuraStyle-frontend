import React from "react";
import "./StyleAnalysisBox.css";

interface StyleAnalysisProps {
    clothingStyle: string;
    colorPalette: string[];
    styleScore: number;
    hasData?: boolean;
    hasImage?: boolean;
}

const StyleAnalysisBox: React.FC<StyleAnalysisProps> = ({
    clothingStyle,
    colorPalette = [],
    styleScore,
    hasData = false,
    hasImage = false
}) => {

    const displayColorPalette = colorPalette.length > 0 ? colorPalette : ["#A0A0A0", "#A0A0A0", "#A0A0A0"];

    return (
        <div className="style-analysis-box">
            <div className="box-title-wrapper">
                <h3 className="box-title">Анализ стиля</h3>
            </div>

            <div className="analysis-content">
                {hasData ? (
                    <>
                        {/* Секция стиля одежды */}
                        <div className="analysis-section">
                            <h4 className="section-title">Стиль одежды:</h4>
                            <div className="style-tag">{clothingStyle}</div>
                            <div className="divider"></div>
                        </div>

                        {/* Секция цветовой палитры */}
                        <div className="analysis-section">
                            <h4 className="section-title">Основные цвета в образе:</h4>
                            <div className="color-palette">
                                {displayColorPalette.map((color, index) => (
                                    <div
                                        key={index}
                                        className="color-sample"
                                        style={{ backgroundColor: color }}
                                        title={`Цвет ${index + 1}: ${color}`}
                                    />
                                ))}
                            </div>
                            <div className="divider"></div>
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
                    </>
                ) : hasImage ? (
                    <div className="analysis-loading">
                        <div className="loading-spinner"></div>
                        <p>Анализируем изображение...</p>
                        <p className="loading-subtitle">AI модуль обрабатывает ваш стиль</p>
                    </div>
                ) : (
                    <div className="analysis-empty">
                        <p>Загрузите изображение для анализа стиля</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StyleAnalysisBox;