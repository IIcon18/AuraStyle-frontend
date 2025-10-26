import React from "react";
import "./UploadImageBox.css";
import UploadIcon from "../assets/icons/upload_image.svg";
import Pen from "../assets/icons/pen.svg";

const UploadImageBox: React.FC = () => {
    return (
        <div className="upload-image-box">
            <h3 className="box-title">
                <img src={Pen} alt="Pen" className="pen-icon" />
                Загрузите сюда свое изображение
            </h3>

            <div className="upload-area">
                <img src={UploadIcon} alt="Загрузить изображение" className="upload-icon" />
            </div>
        </div>
    );
};

export default UploadImageBox;