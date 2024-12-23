
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = NotificationArgsProps['placement'];


export const useOpenNotification = () => {
    const [api] = notification.useNotification();

    const openNotification = (type: NotificationType='success', placement: NotificationPlacement="bottomRight") => {
        api[type]({
            message: `Notification ${placement}`,
            description:"This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            placement,
        });
    };


    return openNotification
};

