import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase.js';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Monitor authentication state to get the current user's ID
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Fetch notifications for the authenticated user
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('recipientId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notificationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Mark a notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: true });
    } catch (error) {
      console.error('Error updating notification: ', error);
    }
  };

  // Add a new notification (this function can be called from other parts of your application)
  const addNotification = async (recipientId, senderId, type, itemId) => {
    try {
      const notificationsRef = collection(db, 'notifications');
      await addDoc(notificationsRef, {
        recipientId,
        senderId,
        type,
        itemId,
        timestamp: serverTimestamp(),
        read: false,
      });
    } catch (error) {
      console.error('Error adding notification: ', error);
    }
  };

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.read ? 'read' : 'unread'}`}
          onClick={() => markNotificationAsRead(notification.id)}
        >
          {/* Customize the notification display as needed */}
          <p>{notification.type} - {notification.itemId}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
