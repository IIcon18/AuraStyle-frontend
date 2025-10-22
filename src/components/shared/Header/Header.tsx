import React, { useState } from "react";
import "./Header.css"

const Header: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo">
                    <span className="logo-white">Aura.Style</span>
                </div>
            </div>
        </header>
    );
};

export default Header;