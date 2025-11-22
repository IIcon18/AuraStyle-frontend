import React, { useState, useRef } from "react";
import "./UploadImageBox.css";
import UploadIcon from "../assets/icons/upload_image.svg";
import PenIcon from "../assets/icons/pen.svg";

interface UploadImageBoxProps {
    onImageUpload?: (file: File) => void;
    previewUrl?: string | null;
}

const UploadImageBox: React.FC<UploadImageBoxProps> = ({ onImageUpload, previewUrl }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите файл изображения');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('Размер файла не должен превышать 10MB');
            return;
        }

        if (onImageUpload) {
            onImageUpload(file);
        }

        console.log('Файл загружен:', file.name);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
        }
    };

    return (
        <div className="upload-image-box">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div
                className={`upload-area ${isDragOver ? 'drag-over' : ''} ${previewUrl ? 'has-preview' : ''}`}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onKeyPress={handleKeyPress}
                role="button"
                tabIndex={0}
                aria-label="Загрузить изображение для анализа стиля"
            >
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Предпросмотр загруженного изображения"
                        className="upload-preview"
                    />
                ) : (
                    <img
                        src={UploadIcon}
                        alt="Иконка загрузки"
                        className="upload-icon"
                    />
                )}
            </div>

            <h3 className="box1-title">
                <img src={PenIcon} alt="" className="pen-icon" />
                {previewUrl ? "Изображение загружено" : "Загрузите изображение"}
            </h3>

            {previewUrl && (
                <div className="upload-info">
                    <button
                        className="change-image-btn"
                        onClick={handleClick}
                    >
                        Заменить изображение
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadImageBox;