import React from "react";
import "./Profile.css";
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import HomeIcon from "../../assets/icons/home.svg";
import ProfileForm from "../ProfileForm";

const Profile: React.FC = () => {
    const handleHomeClick = () => {
        window.location.href = "/main";
    };

    return (
        <div className="profile-page">
            <div className="header-with-icon">
                <Header />
                <img
                    src={HomeIcon}
                    alt="Home"
                    className="home-icon-profile"
                    onClick={handleHomeClick}
                />
            </div>

            <main className="profile-content">
                <ProfileForm />
            </main>

            <Footer />
        </div>
    );
};

export default Profile;