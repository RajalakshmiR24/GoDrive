export const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications'); // Replace with your API endpoint
      const data = await response.json();
      return data.notifications;
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      return [];
    }
  };
  