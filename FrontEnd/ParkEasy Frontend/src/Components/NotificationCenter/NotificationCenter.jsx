import React, { useState } from "react";
import { Bell, X, Check, Clock, Calendar, User } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, CardFooter, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Avatar, AvatarImage, AvatarFallback, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";

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

  return (
    <div className="relative bg-white">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NotificationCenter;
