import React from "react";
import "./ResetButton.css";
import ResetIcon from "../../../assets/icons/reset.svg";
interface ResetButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
                                                            onClick,
                                                            disabled = false,
                                                            children = "Сбросить"
                                                        }) => {
    return (
        <button
            type="button"
            className="reset-button"
            onClick={onClick}
            disabled={disabled}
        >
            <img
                src={ResetIcon}
                alt="Reset"
                className="reset-icon"
            />
            {children}
        </button>
    );
};

export default ResetButton;