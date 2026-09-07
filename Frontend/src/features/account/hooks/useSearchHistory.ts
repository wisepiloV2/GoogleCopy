import { useState, useEffect, useCallback } from 'react';
import { apiSearchHistory } from '@/api/apiSearchHistory';
import { type HistoryItem } from '@/api/types';
import { useAuth } from '@/context/AuthContext';

export const useSearchHistory = () => {
const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

const [history, setHistory] = useState<HistoryItem[]>([]);
const [isLoading, setIsLoading] = useState(false);

const fetchHistory = useCallback(async () => {
// Si todavía estamos comprobando la sesión, esperamos.
if (isAuthLoading) {
return;
}

// Si no hay usuario autenticado, no hacemos la petición.
if (!isAuthenticated) {
  setHistory([]);
  setIsLoading(false);
  return;
}

setIsLoading(true);

try {
  const data = await apiSearchHistory.getAllHistory();
  setHistory(data);
} catch {
  setHistory([]);
} finally {
  setIsLoading(false);
}


}, [isAuthenticated, isAuthLoading]);

useEffect(() => {
fetchHistory();
}, [fetchHistory]);

const handleDeleteItem = async (id: number) => {
if (!isAuthenticated) return;

try {
  await apiSearchHistory.deleteHistoryById(id);
  setHistory((prev) => prev.filter((item) => item.id !== id));
} catch {
}


};

const handleDeleteAll = async () => {
if (!isAuthenticated) return;

if (!window.confirm('¿Estás seguro de que deseas borrar todo tu historial?')) {
  return;
}

try {
  await apiSearchHistory.deleteAllHistory();
  setHistory([]);
} catch {
}


};

return {
history,
isLoading,
handleDeleteItem,
handleDeleteAll,
refreshHistory: fetchHistory,
};
};
