import { Station, Trip, Connection } from '../types';

export const mockStations: Station[] = [
  { id: '1', name: 'Berlin Hauptbahnhof', city: 'Berlin', coordinates: { lat: 52.5251, lng: 13.3694 } },
  { id: '2', name: 'München Hauptbahnhof', city: 'München', coordinates: { lat: 48.1402, lng: 11.5581 } },
  { id: '3', name: 'Hamburg Hauptbahnhof', city: 'Hamburg', coordinates: { lat: 53.5528, lng: 10.0067 } },
  { id: '4', name: 'Köln Hauptbahnhof', city: 'Köln', coordinates: { lat: 50.9429, lng: 6.9583 } },
  { id: '5', name: 'Frankfurt (Main) Hauptbahnhof', city: 'Frankfurt am Main', coordinates: { lat: 50.1072, lng: 8.6633 } },
  { id: '6', name: 'Stuttgart Hauptbahnhof', city: 'Stuttgart', coordinates: { lat: 48.7840, lng: 9.1829 } },
  { id: '7', name: 'Düsseldorf Hauptbahnhof', city: 'Düsseldorf', coordinates: { lat: 51.2206, lng: 6.7939 } },
  { id: '8', name: 'Nürnberg Hauptbahnhof', city: 'Nürnberg', coordinates: { lat: 49.4458, lng: 11.0831 } },
  { id: '9', name: 'Leipzig Hauptbahnhof', city: 'Leipzig', coordinates: { lat: 51.3459, lng: 12.3821 } },
  { id: '10', name: 'Dresden Hauptbahnhof', city: 'Dresden', coordinates: { lat: 51.0407, lng: 13.7320 } },
  { id: '11', name: 'Hannover Hauptbahnhof', city: 'Hannover', coordinates: { lat: 52.3759, lng: 9.7417 } },
  { id: '12', name: 'Bremen Hauptbahnhof', city: 'Bremen', coordinates: { lat: 53.0831, lng: 8.8135 } },
  { id: '13', name: 'Dortmund Hauptbahnhof', city: 'Dortmund', coordinates: { lat: 51.5181, lng: 7.4598 } },
  { id: '14', name: 'Essen Hauptbahnhof', city: 'Essen', coordinates: { lat: 51.4508, lng: 7.0131 } },
  { id: '15', name: 'Karlsruhe Hauptbahnhof', city: 'Karlsruhe', coordinates: { lat: 49.0093, lng: 8.4044 } },
];

export const generateMockTrips = (from: string, to: string, date: Date): Trip[] => {
  const fromStation = mockStations.find(s => s.name.toLowerCase().includes(from.toLowerCase())) || mockStations[0];
  const toStation = mockStations.find(s => s.name.toLowerCase().includes(to.toLowerCase())) || mockStations[1];

  const trips: Trip[] = [];
  const baseDate = new Date(date);

  for (let i = 0; i < 12; i++) {
    const departureTime = new Date(baseDate);
    departureTime.setHours(5 + i * 1.5, Math.random() * 60);
    
    const duration = 120 + Math.random() * 300; // 2-7 hours
    const arrivalTime = new Date(departureTime.getTime() + duration * 60 * 1000);
    
    const transfers = Math.floor(Math.random() * 4);
    const delay = Math.random() > 0.75 ? Math.floor(Math.random() * 20) : undefined;
    
    const trainTypes = ['ICE', 'IC', 'EC', 'RE', 'RB'];
    const trainType = trainTypes[Math.floor(Math.random() * trainTypes.length)];
    
    const connections: Connection[] = [];
    
    // Add main connection
    connections.push({
      id: `conn-${i}-0`,
      from: fromStation,
      to: toStation,
      departure: departureTime,
      arrival: arrivalTime,
      platform: `${Math.floor(Math.random() * 16) + 1}`,
      trainType,
      trainNumber: `${Math.floor(Math.random() * 9000) + 1000}`,
      delay,
    });

    // Calculate price based on distance and train type
    let basePrice = 29.90;
    if (trainType === 'ICE') basePrice = 59.90;
    else if (trainType === 'IC' || trainType === 'EC') basePrice = 49.90;
    
    const price = basePrice + Math.random() * 100;

    trips.push({
      id: `trip-${i}`,
      from: fromStation,
      to: toStation,
      departure: departureTime,
      arrival: arrivalTime,
      duration: Math.floor(duration),
      transfers,
      delay,
      platform: `${Math.floor(Math.random() * 16) + 1}`,
      trainType,
      trainNumber: `${Math.floor(Math.random() * 9000) + 1000}`,
      price,
      connections,
    });
  }

  return trips.sort((a, b) => a.departure.getTime() - b.departure.getTime());
};

export const searchStations = (query: string): Station[] => {
  if (!query || query.length < 2) return [];
  
  return mockStations.filter(station =>
    station.name.toLowerCase().includes(query.toLowerCase()) ||
    station.city?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);
};