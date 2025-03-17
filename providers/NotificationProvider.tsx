import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import React from "react";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/lib/supabase";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { profile } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        setExpoPushToken(token ?? "");
        if (!token) {
          return;
        }
        await supabase
          .from("profiles")
          .update({ expo_push_token: token })
          .eq("id", profile.id);
      })
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
