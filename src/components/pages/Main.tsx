import Profile from "../../assets/icons/profile.svg";
import React from "react";
import "./Main.css";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import UploadImageBox from "../UploadImageBox";
import StyleAnalysisBox from "../StyleAnalysisBox";
import ResetButton from "../shared/Buttons/ResetButton";

const Main: React.FC = () => {
    return (
        <div className="main-page">
            <div className="header-with-icon">
                <Header />
                <img src={Profile} alt="Profile" className="profile-icon-main" />
            </div>

            <main className="main-content">
                <div className="main-container">
                    <div className="boxes-row">
                        <UploadImageBox />
                        <StyleAnalysisBox
                            clothingStyle="Спортивный"
                            colorPalette={["#A0A0A0", "#A0A0A0", "#A0A0A0"]}
                            styleLevelName="Уровень стиля"
                            styleScore={70}
                        />
                    </div>

                    <div className="reset-button-container">
                        <ResetButton />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Main;