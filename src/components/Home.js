import React from 'react';
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <div className="container">
                <h2>{t('Home.title')}</h2>
            </div>
        </div>
    );
};

export default Home;
