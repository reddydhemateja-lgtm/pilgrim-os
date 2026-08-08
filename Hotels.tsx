import { ScrollView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

const BACKEND = 'https://pilgrim-os-backend.onrender.com';

interface Hotel {
  _id: string;
  name: string;
  distance: string;
  price: string;
  rating: string;
  type: string;
  available: boolean;
  phone: string;
  address: string;
  location: string;
}

interface Props {
  onBack: () => void;
}

export default function Hotels({ onBack }: Props) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState('tirupati-city');
  const [filter, setFilter] = useState('All');

  const fetchHotels = async (loc: string) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${BACKEND}/api/hotels?location=${loc}`);
      const data = await res.json();
      if (data.success) {
        setHotels(data.data);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels(location);
  }, [location]);

  const filtered = filter === 'All'
    ? hotels
    : filter === 'Available Now'
    ? hotels.filter(h => h.available)
    : hotels.filter(h => h.type === filter);

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🏨 Hotels</Text>
        <Text style={styles.headerSub}>Find the perfect stay for your pilgrimage</Text>
      </View>

      {/* LOCATION TABS */}
      <View style={styles.locationRow}>
        <TouchableOpacity
          style={[styles.locationTab, location === 'tirupati-city' && styles.locationTabActive]}
          onPress={() => { setLocation('tirupati-city'); setFilter('All'); }}
        >
          <Text style={[styles.locationTabText, location === 'tirupati-city' && styles.locationTabTextActive]}>
            🏙️ Tirupati City
          </Text>
          <Text style={[styles.locationTabSub, location === 'tirupati-city' && styles.locationTabTextActive]}>
            Near Railway Station
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.locationTab, location === 'tirumala' && styles.locationTabActive]}
          onPress={() => { setLocation('tirumala'); setFilter('All'); }}
        >
          <Text style={[styles.locationTabText, location === 'tirumala' && styles.locationTabTextActive]}>
            ⛰️ Tirumala Hill
          </Text>
          <Text style={[styles.locationTabSub, location === 'tirumala' && styles.locationTabTextActive]}>
            Near Temple Gate
          </Text>
        </TouchableOpacity>
      </View>

      {/* INFO BANNER */}
      <View style={styles.infoBanner}>
        <Text style={styles.infoText}>
          {location === 'tirupati-city'
            ? '🚌 Tirumala is 23 km from Tirupati city — 40-60 min by bus'
            : '🛕 Walking distance to temple — book TTD rooms via ttdevasthanams.ap.gov.in'}
        </Text>
      </View>

      {/* FILTER BAR */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {['All', 'Budget', 'Mid-range', 'Premium', 'Available Now'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* HOTEL LIST */}
      <View style={styles.section}>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#ea580c" />
            <Text style={styles.loadingText}>Fetching hotels...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ Could not load hotels.</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={() => fetchHotels(location)}>
              <Text style={styles.retryBtnText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              {filtered.length} hotels in {location === 'tirupati-city' ? 'Tirupati City' : 'Tirumala'}
            </Text>
            {filtered.length === 0 ? (
              <Text style={styles.emptyText}>No hotels found for this filter.</Text>
            ) : (
              filtered.map((hotel) => (
                <View key={hotel._id} style={[styles.hotelCard, !hotel.available && styles.hotelUnavailable]}>
                  <View style={styles.hotelImage}>
                    <Text style={styles.hotelImageText}>🏨</Text>
                  </View>
                  <View style={styles.hotelInfo}>
                    <View style={styles.hotelTop}>
                      <Text style={styles.hotelName}>{hotel.name}</Text>
                      <View style={[
                        styles.typeBadge,
                        hotel.type === 'Premium' && styles.typePremium,
                        hotel.type === 'Budget' && styles.typeBudget,
                      ]}>
                        <Text style={styles.typeText}>{hotel.type}</Text>
                      </View>
                    </View>
                    <Text style={styles.hotelDistance}>📍 {hotel.distance}</Text>
                    <Text style={styles.hotelAddress}>🏠 {hotel.address}</Text>
                    {hotel.phone ? <Text style={styles.hotelPhone}>📞 {hotel.phone}</Text> : null}
                    <View style={styles.hotelBottom}>
                      <View>
                        <Text style={styles.hotelPrice}>₹{hotel.price}/night</Text>
                        <Text style={styles.hotelRating}>⭐ {hotel.rating}</Text>
                      </View>
                      {hotel.available ? (
                        <TouchableOpacity style={styles.bookBtn}>
                          <Text style={styles.bookBtnText}>Book Now</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.fullBtn}>
                          <Text style={styles.fullBtnText}>Full</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))
            )}
          </>
        )}
      </View>

      {/* LIST YOUR HOTEL */}
      <View style={styles.listSection}>
        <Text style={styles.listTitle}>🏨 Own a hotel near Tirumala?</Text>
        <Text style={styles.listSub}>List it free on PilgrimOS and reach lakhs of pilgrims</Text>
        <TouchableOpacity style={styles.listBtn}>
          <Text style={styles.listBtnText}>List your hotel free →</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF5' },
  header: { backgroundColor: '#ea580c', padding: 24 },
  backBtn: { marginBottom: 8 },
  backText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 13, color: '#fed7aa' },
  locationRow: { flexDirection: 'row', backgroundColor: '#1c1917', padding: 12, gap: 10 },
  locationTab: { flex: 1, backgroundColor: '#374151', padding: 14, borderRadius: 14, alignItems: 'center' },
  locationTabActive: { backgroundColor: '#ea580c' },
  locationTabText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  locationTabSub: { color: '#9ca3af', fontSize: 11, marginTop: 2 },
  locationTabTextActive: { color: '#fff' },
  infoBanner: { backgroundColor: '#fef3c7', padding: 10, borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  infoText: { fontSize: 11, color: '#92400e', textAlign: 'center' },
  filterBar: { backgroundColor: '#fff7ed', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  filterChip: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  filterChipActive: { backgroundColor: '#ea580c', borderColor: '#ea580c' },
  filterText: { color: '#78716c', fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: '#fff' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1c1917', marginBottom: 12 },
  loadingBox: { alignItems: 'center', padding: 40 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#78716c' },
  errorBox: { backgroundColor: '#fee2e2', borderRadius: 14, padding: 16, alignItems: 'center' },
  errorText: { fontSize: 13, color: '#dc2626', marginBottom: 10 },
  retryBtn: { backgroundColor: '#ea580c', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
  retryBtnText: { color: '#fff', fontWeight: '700' },
  emptyText: { textAlign: 'center', color: '#a8a29e', marginTop: 40, fontSize: 14 },
  hotelCard: { flexDirection: 'row', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  hotelUnavailable: { opacity: 0.6 },
  hotelImage: { width: 80, backgroundColor: '#fff7ed', justifyContent: 'center', alignItems: 'center' },
  hotelImageText: { fontSize: 32 },
  hotelInfo: { flex: 1, padding: 12 },
  hotelTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  hotelName: { fontSize: 14, fontWeight: '800', color: '#1c1917', flex: 1 },
  typeBadge: { backgroundColor: '#e7e5e4', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 6 },
  typePremium: { backgroundColor: '#fef3c7' },
  typeBudget: { backgroundColor: '#dcfce7' },
  typeText: { fontSize: 10, fontWeight: '700', color: '#44403c' },
  hotelDistance: { fontSize: 12, color: '#78716c', marginBottom: 2 },
  hotelAddress: { fontSize: 11, color: '#a8a29e', marginBottom: 2 },
  hotelPhone: { fontSize: 11, color: '#a8a29e', marginBottom: 8 },
  hotelBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hotelPrice: { fontSize: 15, fontWeight: '900', color: '#ea580c' },
  hotelRating: { fontSize: 12, fontWeight: '700', color: '#78716c' },
  bookBtn: { backgroundColor: '#ea580c', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  bookBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  fullBtn: { backgroundColor: '#fee2e2', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  fullBtnText: { color: '#dc2626', fontSize: 12, fontWeight: '700' },
  listSection: { margin: 16, backgroundColor: '#1c1917', borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 32 },
  listTitle: { fontSize: 16, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 6 },
  listSub: { fontSize: 12, color: '#a8a29e', textAlign: 'center', marginBottom: 16 },
  listBtn: { backgroundColor: '#ea580c', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  listBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});