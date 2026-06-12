import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const HOTELS = [
  { name: 'TTD Guest House', distance: '0.2 km', price: '₹800/night', rating: '4.5', type: 'Budget', available: true },
  { name: 'Hotel Bliss', distance: '0.5 km', price: '₹1,200/night', rating: '4.2', type: 'Budget', available: true },
  { name: 'Marasa Sarovar', distance: '1.2 km', price: '₹4,500/night', rating: '4.8', type: 'Premium', available: true },
  { name: 'Hotel Minerva', distance: '0.8 km', price: '₹1,800/night', rating: '4.0', type: 'Mid-range', available: false },
  { name: 'Sindoori Hotel', distance: '1.0 km', price: '₹2,200/night', rating: '4.3', type: 'Mid-range', available: true },
  { name: 'Hotel Annamaiah', distance: '0.3 km', price: '₹950/night', rating: '4.1', type: 'Budget', available: true },
];

interface Props {
  onBack: () => void;
}

export default function Hotels({ onBack }: Props) {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🏨 Hotels Near Temple</Text>
        <Text style={styles.headerSub}>Sorted by walking distance from temple gate</Text>
      </View>

      {/* FILTER BAR */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {['All', 'Budget', 'Mid-range', 'Premium', 'Available Now'].map((f) => (
          <TouchableOpacity key={f} style={styles.filterChip}>
            <Text style={styles.filterText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* DISCLAIMER */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          📍 Distance measured from main temple gate • Prices approximate
        </Text>
      </View>

      {/* HOTEL LIST */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {HOTELS.length} hotels found near Tirumala
        </Text>
        {HOTELS.map((hotel, i) => (
          <View key={i} style={[styles.hotelCard, !hotel.available && styles.hotelUnavailable]}>

            {/* Hotel image placeholder */}
            <View style={styles.hotelImage}>
              <Text style={styles.hotelImageText}>🏨</Text>
            </View>

            <View style={styles.hotelInfo}>
              <View style={styles.hotelTop}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <View style={[styles.typeBadge,
                  hotel.type === 'Premium' && styles.typePremium,
                  hotel.type === 'Budget' && styles.typeBudget,
                ]}>
                  <Text style={styles.typeText}>{hotel.type}</Text>
                </View>
              </View>

              <View style={styles.hotelMeta}>
                <Text style={styles.hotelDistance}>📍 {hotel.distance} from temple</Text>
                <Text style={styles.hotelRating}>⭐ {hotel.rating}</Text>
              </View>

              <View style={styles.hotelBottom}>
                <Text style={styles.hotelPrice}>{hotel.price}</Text>
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
        ))}
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
  filterBar: { backgroundColor: '#fff7ed', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  filterChip: { backgroundColor: '#ea580c', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  filterText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  disclaimer: { backgroundColor: '#fef3c7', padding: 10 },
  disclaimerText: { fontSize: 11, color: '#92400e', textAlign: 'center' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1c1917', marginBottom: 12 },
  hotelCard: { flexDirection: 'row', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  hotelUnavailable: { opacity: 0.6 },
  hotelImage: { width: 90, backgroundColor: '#fff7ed', justifyContent: 'center', alignItems: 'center' },
  hotelImageText: { fontSize: 36 },
  hotelInfo: { flex: 1, padding: 12 },
  hotelTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  hotelName: { fontSize: 14, fontWeight: '800', color: '#1c1917', flex: 1 },
  typeBadge: { backgroundColor: '#e7e5e4', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 6 },
  typePremium: { backgroundColor: '#fef3c7' },
  typeBudget: { backgroundColor: '#dcfce7' },
  typeText: { fontSize: 10, fontWeight: '700', color: '#44403c' },
  hotelMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  hotelDistance: { fontSize: 12, color: '#78716c' },
  hotelRating: { fontSize: 12, fontWeight: '700', color: '#ea580c' },
  hotelBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hotelPrice: { fontSize: 15, fontWeight: '900', color: '#ea580c' },
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