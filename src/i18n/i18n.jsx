import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            settingsTitle: 'Settings',
            languageLabel: 'Select Language',
            notificationsTitle: 'Notification Settings',
            enableNotifications: 'Enable Email & Push Notifications',
            notificationsEnabled: 'Notifications are currently enabled',
            notificationsDisabled: 'Notifications are currently disabled'
        }
    },
    es: {
        translation: {
            settingsTitle: 'Configuración',
            languageLabel: 'Seleccionar idioma',
            notificationsTitle: 'Configuración de notificaciones',
            enableNotifications: 'Habilitar notificaciones por correo y push',
            notificationsEnabled: 'Las notificaciones están actualmente activadas',
            notificationsDisabled: 'Las notificaciones están actualmente desactivadas'
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;