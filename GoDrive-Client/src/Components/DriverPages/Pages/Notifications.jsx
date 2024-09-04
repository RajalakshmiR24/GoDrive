import React, { useEffect, useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch('/notifications');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setNotifications(data);
        } else {
          throw new Error('Expected JSON response but got something else.');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError(error.message);
      }
    }

    fetchNotifications();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
}

export default Notifications;
