import React, { useState } from "react";
import { Bell, X, Check, Clock, Calendar, User } from "lucide-react";

const NotificationCenter = ({
  notifications = [],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onClearAll = () => {},
  onNotificationAction = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "payment":
        return <Clock className="h-4 w-4 text-green-500" />;
      case "system":
        return <Bell className="h-4 w-4 text-yellow-500" />;
      case "reminder":
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="relative bg-white">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 border rounded-full">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 md:w-96 z-50 bg-white shadow-lg border rounded-lg">
          <div className="p-3 flex justify-between items-center border-b">
            <h3 className="text-lg font-bold">Notifications</h3>
            <div className="space-x-2">
              <button onClick={onMarkAllAsRead} className="text-sm text-blue-500">Mark all as read</button>
              <button onClick={onClearAll} className="text-sm text-red-500">Clear all</button>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto p-2">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications yet</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer flex items-start ${notification.read ? "bg-gray-100" : "bg-blue-50"}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="mr-3">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-500">{formatTime(notification.time)}</p>
                    <p className="text-xs text-gray-700">{notification.message}</p>
                  </div>
                  {!notification.read && <div className="ml-2 h-2 w-2 rounded-full bg-blue-500" />}
                </div>
              ))
            )}
          </div>
          <div className="p-3 border-t text-center">
            <button onClick={() => setIsOpen(false)} className="text-sm text-gray-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;