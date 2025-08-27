import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { mockFeeDetails, mockDocuments, mockScholarships, mockAcademicRecords } from '../data/mockData';

export const useRealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: '1',
      title: 'Assignment Due Tomorrow',
      message: 'Data Structures assignment is due tomorrow at 11:59 PM',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      target_role: ['student'],
      priority: 'high'
    },
    {
      id: '2',
      title: 'Fee Payment Reminder',
      message: 'Your semester fee payment is due on January 15th',
      type: 'info',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: false,
      target_role: ['student', 'parent'],
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Scholarship Approved',
      message: 'Congratulations! Your Merit Scholarship has been approved',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      target_role: ['student'],
      priority: 'high'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Filter notifications by user role
    const userNotifications = notifications.filter(n => 
      n.target_role.includes(user.role)
    );
    setNotifications(userNotifications);
    setLoading(false);

    // Set up real-time subscription
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `target_role.cs.{${user.role}}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setNotifications(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setNotifications(prev => 
              prev.map(notif => 
                notif.id === payload.new.id ? payload.new : notif
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setNotifications(prev => 
              prev.filter(notif => notif.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (!error) {
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  };

  return { notifications, loading, markAsRead };
};

export const useRealtimeDocuments = () => {
  const [documents, setDocuments] = useState<any[]>(mockDocuments);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Use mock data for now
    setLoading(false);

    // Set up real-time subscription
    const channel = supabase
      .channel('user_documents')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setDocuments(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setDocuments(prev => 
              prev.map(doc => 
                doc.id === payload.new.id ? payload.new : doc
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { documents, loading };
};