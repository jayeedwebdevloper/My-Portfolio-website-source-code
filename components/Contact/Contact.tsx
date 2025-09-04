'use client';
import { useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Contact";
    }, [])
    return (
        <div className="min-h-screen">
            <ContactForm />
        </div>
    );
};

export default Contact;