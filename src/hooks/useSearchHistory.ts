import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot, addDoc, deleteDoc, doc, getDocs, writeBatch, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export interface SearchHistoryItem {
  id: string;
  from_station: string;
  to_station: string;
  search_date: string;
  search_time: string;
  created_at: string;
}

export const useSearchHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, 'search_history'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map(doc => ({
        id: doc.id,
        from_station: doc.data().fromStation,
        to_station: doc.data().toStation,
        search_date: doc.data().searchDate,
        search_time: doc.data().searchTime,
        created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      }));
      setHistory(historyData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching search history:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addToHistory = async (fromStation: string, toStation: string, date: Date, time: string) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'search_history'), {
        userId: user.uid,
        fromStation,
        toStation,
        searchDate: date.toISOString().split('T')[0],
        searchTime: time,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error adding to search history:', error);
    }
  };

  const clearHistory = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'search_history'),
        where('userId', '==', user.uid)
      );
      
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      toast.success('Verlauf gelöscht');
    } catch (error) {
      console.error('Error clearing search history:', error);
      toast.error('Fehler beim Löschen des Verlaufs');
    }
  };

  return {
    history,
    loading,
    addToHistory,
    clearHistory,
    refetch: () => {}, // Real-time updates handle this automatically
  };
};