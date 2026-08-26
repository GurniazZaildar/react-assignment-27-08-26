import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();

  // Initialize notification state from localStorage (defaults to true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Sync notification state changes to localStorage
  useEffect(() => {
    localStorage.setItem(
      'notificationsEnabled',
      JSON.stringify(notificationsEnabled)
    );
  }, [notificationsEnabled]);

  // Handle language change
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // Toggle notification preference
  const handleNotificationToggle = (e) => {
    setNotificationsEnabled(e.target.checked);
  };

  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '500px',
        margin: '0 auto',
        fontFamily: 'sans-serif'
      }}
    >
      <h2>{t('settingsTitle')}</h2>

      {/* Language Switcher */}
      <div
        style={{
          marginBottom: '24px',
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      >
        <label
          htmlFor="language-select"
          style={{
            fontWeight: 'bold',
            display: 'block',
            marginBottom: '8px'
          }}
        >
          {t('languageLabel')}
        </label>
        <select
          id="language-select"
          value={i18n.language}
          onChange={handleLanguageChange}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            borderRadius: '4px',
            width: '100%'
          }}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>

      {/* Notification Settings */}
      <div
        style={{
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      >
        <h3 style={{ marginTop: 0 }}>{t('notificationsTitle')}</h3>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationToggle}
            style={{ marginRight: '10px', width: '18px', height: '18px' }}
          />
          {t('enableNotifications')}
        </label>
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          {notificationsEnabled
            ? t('notificationsEnabled')
            : t('notificationsDisabled')}
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;