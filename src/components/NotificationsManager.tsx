import React from 'react';
import Notification, { NotificationType } from './Notification';

export interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationsManagerProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
  className?: string;
}

const NotificationsManager: React.FC<NotificationsManagerProps> = ({
  notifications,
  onDismiss,
  className = ''
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className={`notifications-container ${className}`}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => onDismiss(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationsManager; 