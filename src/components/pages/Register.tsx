import React from "react";
import "./Register.css"
import Header from "../shared/Header/Header";
import Footer from "../shared/Footer/Footer";
import RegistrationForm from "../RegistrationForm";

const Register: React.FC = () => {
    console.log("🔵 Register страница загружена");

    return (
        <div  className="register-page">
            <Header />

            <main className="main-content">
                <RegistrationForm/>
            </main>

            <Footer />
        </div>
    );
};

export default Register;
