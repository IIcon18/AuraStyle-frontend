import React from "react";
import "./ResetButton.css";
import ResetIcon from "../../../assets/icons/reset.svg";

interface ResetButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

const ResetButton: React.FC<ResetButtonProps> = ({
                                                     onClick,
                                                     disabled = false,
                                                     children = "Сбросить"
                                                 }) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    return (
        <button
            type="button"
            className="reset-button"
            onClick={handleClick}
            disabled={disabled}
            aria-label="Сбросить настройки"
        >
            <img
                src={ResetIcon}
                alt=""
                className="reset-icon"
            />
            {children}
        </button>
    );
};

export default ResetButton;