export interface Station {
  id: string;
  name: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Trip {
  id: string;
  from: Station;
  to: Station;
  departure: Date;
  arrival: Date;
  duration: number; // in minutes
  transfers: number;
  delay?: number; // in minutes
  platform?: string;
  trainType: string;
  trainNumber: string;
  price?: number;
  connections: Connection[];
}

export interface Connection {
  id: string;
  from: Station;
  to: Station;
  departure: Date;
  arrival: Date;
  platform?: string;
  trainType: string;
  trainNumber: string;
  delay?: number;
}

export interface SearchParams {
  from: string;
  to: string;
  date: Date;
  time: string;
  passengers: number;
}

export interface RecentSearch {
  id: string;
  from: Station;
  to: Station;
  searchDate: Date;
}

export interface FavoriteRoute {
  id: string;
  name: string;
  from: Station;
  to: Station;
  createdAt: Date;
}