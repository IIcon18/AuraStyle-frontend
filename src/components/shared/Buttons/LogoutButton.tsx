import React from "react";
import "./LogoutButton.css";
import ExitIcon from "../../../assets/icons/exit.svg";

interface LogoutButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    absolute?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
                                                              onClick,
                                                              disabled = false,
                                                              children = "Выйти",
                                                              absolute = false
                                                          }) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const handleLogout = () => {
        console.log("Выход из профиля");
        window.location.href = "/login";
    };

    return (
        <div className={absolute ? "logout-button-absolute" : "logout-button-container"}>
            <button
                className="logout-button"
                onClick={onClick || handleLogout}
                disabled={disabled}
            >
                <img
                    src={ExitIcon}
                    alt="Выйти"
                    className="exit-icon"
                />
                {children}
            </button>
        </div>
    );
};

export default LogoutButton;