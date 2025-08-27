import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { mockFeeDetails, mockAcademicRecords, mockDocuments, mockScholarships } from '../data/mockData';

export const useSupabaseData = <T>(
  table: string,
  filters?: { column: string; value: any }[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        let query = supabase.from(table).select('*');

        // Apply filters
        if (filters) {
          filters.forEach(filter => {
            query = query.eq(filter.column, filter.value);
          });
        }

        const { data: result, error: fetchError } = await query;

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setData(result || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, user, filters]);

  const refetch = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase.from(table).select('*');

      if (filters) {
        filters.forEach(filter => {
          query = query.eq(filter.column, filter.value);
        });
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setData(result || []);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Specific hooks for different data types
export const useFeeDetails = () => {
  const { user } = useAuth();
  const [data, setData] = useState(mockFeeDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return { data, loading, error, refetch: () => {} };
};

export const useAcademicRecords = () => {
  const { user } = useAuth();
  const [data, setData] = useState(mockAcademicRecords);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return { data, loading, error, refetch: () => {} };
};

export const useDocuments = () => {
  const { user } = useAuth();
  const [data, setData] = useState(mockDocuments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return { data, loading, error, refetch: () => {} };
};

export const useScholarships = () => {
  const { user } = useAuth();
  const [data, setData] = useState(mockScholarships);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return { data, loading, error, refetch: () => {} };
};

export const useNotifications = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data: result, error: fetchError } = await supabase
          .from('notifications')
          .select('*')
          .contains('target_role', [user.role])
          .order('timestamp', { ascending: false });

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setData(result || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  return { data, loading, error };
};

export const useTasks = () => {
  const { user } = useAuth();
  return useSupabaseData('tasks', user ? [{ column: 'user_id', value: user.id }] : []);
};

export const useAcademicMaterials = () => {
  return useSupabaseData('academic_materials');
};