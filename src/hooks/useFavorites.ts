import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export interface FavoriteRoute {
  id: string;
  name: string;
  from_station: string;
  to_station: string;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteRoute[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, 'favorite_routes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favoritesData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        from_station: doc.data().fromStation,
        to_station: doc.data().toStation,
        created_at: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      }));
      setFavorites(favoritesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching favorites:', error);
      toast.error('Fehler beim Laden der Favoriten');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addFavorite = async (name: string, fromStation: string, toStation: string) => {
    if (!user) {
      toast.error('Bitte melden Sie sich an, um Favoriten zu speichern');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'favorite_routes'), {
        userId: user.uid,
        name,
        fromStation,
        toStation,
        createdAt: Timestamp.now()
      });
      
      toast.success('Favorit hinzugefügt');
      return { id: docRef.id };
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast.error('Fehler beim Hinzufügen des Favoriten');
    }
  };

  const removeFavorite = async (id: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'favorite_routes', id));
      toast.success('Favorit entfernt');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Fehler beim Entfernen des Favoriten');
    }
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    refetch: () => {}, // Real-time updates handle this automatically
  };
};