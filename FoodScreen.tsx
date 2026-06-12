import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ANNADANAM = [
  { meal: 'Morning Breakfast', time: '6:00 AM - 8:00 AM', location: 'TTD Annadanam Hall', free: true },
  { meal: 'Afternoon Lunch', time: '12:00 PM - 2:00 PM', location: 'TTD Annadanam Hall', free: true },
  { meal: 'Evening Dinner', time: '7:00 PM - 9:00 PM', location: 'TTD Annadanam Hall', free: true },
];

const CANTEEN = [
  { item: 'Idli & Sambar', price: '₹20', type: 'Breakfast' },
  { item: 'Pongal', price: '₹25', type: 'Breakfast' },
  { item: 'Meals (Full)', price: '₹50', type: 'Lunch' },
  { item: 'Pulihora', price: '₹30', type: 'Lunch' },
  { item: 'Lemon Rice', price: '₹30', type: 'Lunch' },
  { item: 'Curd Rice', price: '₹25', type: 'Dinner' },
];

const RESTAURANTS = [
  { name: 'Murugan Idli Shop', type: 'South Indian', distance: '0.3 km', price: '₹100-200', rating: '4.5', pure_veg: true },
  { name: 'Hotel Bhimas', type: 'Andhra Meals', distance: '0.5 km', price: '₹150-300', rating: '4.3', pure_veg: true },
  { name: 'Saravanaa Bhavan', type: 'South Indian', distance: '0.8 km', price: '₹200-400', rating: '4.6', pure_veg: true },
  { name: 'Tirupati Bhavan', type: 'North Indian', distance: '1.0 km', price: '₹150-350', rating: '4.1', pure_veg: true },
];

const PRASADAM = [
  { name: 'Laddu (Small)', price: '₹25', available: true },
  { name: 'Laddu (Big)', price: '₹50', available: true },
  { name: 'Vada', price: '₹10', available: true },
  { name: 'Pulihora', price: '₹20', available: false },
];

interface Props {
  onBack: () => void;
}

export default function FoodScreen({ onBack }: Props) {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🍛 Food & Prasadam</Text>
        <Text style={styles.headerSub}>Free meals, canteen & restaurants near temple</Text>
      </View>

      {/* ANNADANAM */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🙏 Free Annadanam</Text>
        <Text style={styles.sectionSub}>TTD provides free meals to ALL pilgrims — no ticket needed</Text>
        {ANNADANAM.map((a, i) => (
          <View key={i} style={styles.annadanamCard}>
            <View style={styles.freeTag}>
              <Text style={styles.freeTagText}>FREE</Text>
            </View>
            <Text style={styles.mealName}>{a.meal}</Text>
            <Text style={styles.mealTime}>⏰ {a.time}</Text>
            <Text style={styles.mealLocation}>📍 {a.location}</Text>
          </View>
        ))}
      </View>

      {/* TTD CANTEEN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏪 TTD Canteen Menu</Text>
        <Text style={styles.sectionSub}>Affordable pure veg food inside temple complex</Text>
        <View style={styles.canteenGrid}>
          {CANTEEN.map((item, i) => (
            <View key={i} style={styles.canteenCard}>
              <Text style={styles.canteenItem}>{item.item}</Text>
              <Text style={styles.canteenType}>{item.type}</Text>
              <Text style={styles.canteenPrice}>{item.price}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* PRASADAM */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🪔 Prasadam</Text>
        <Text style={styles.sectionSub}>TTD official prasadam — today's availability</Text>
        {PRASADAM.map((p, i) => (
          <View key={i} style={[styles.prasadamCard, !p.available && styles.prasadamUnavailable]}>
            <Text style={styles.prasadamName}>{p.name}</Text>
            <View style={styles.prasadamRight}>
              <Text style={styles.prasadamPrice}>{p.price}</Text>
              {p.available ? (
                <View style={styles.availBadge}>
                  <Text style={styles.availText}>Available</Text>
                </View>
              ) : (
                <View style={styles.unavailBadge}>
                  <Text style={styles.unavailText}>Sold Out</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* RESTAURANTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🍽️ Restaurants Near Temple</Text>
        <Text style={styles.sectionSub}>All pure vegetarian — sorted by distance</Text>
        {RESTAURANTS.map((r, i) => (
          <View key={i} style={styles.restaurantCard}>
            <View style={styles.restaurantLeft}>
              <Text style={styles.restaurantEmoji}>🍽️</Text>
            </View>
            <View style={styles.restaurantInfo}>
              <View style={styles.restaurantTop}>
                <Text style={styles.restaurantName}>{r.name}</Text>
                <View style={styles.vegBadge}>
                  <Text style={styles.vegText}>Pure Veg</Text>
                </View>
              </View>
              <Text style={styles.restaurantType}>{r.type}</Text>
              <View style={styles.restaurantMeta}>
                <Text style={styles.restaurantDistance}>📍 {r.distance}</Text>
                <Text style={styles.restaurantRating}>⭐ {r.rating}</Text>
                <Text style={styles.restaurantPrice}>{r.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* TIP */}
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Important</Text>
        <Text style={styles.tipText}>
          Tirumala is a pure vegetarian zone. No non-veg food, eggs, or alcohol allowed inside the temple complex or surrounding areas.
        </Text>
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
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1c1917', marginBottom: 4 },
  sectionSub: { fontSize: 12, color: '#78716c', marginBottom: 12 },
  annadanamCard: { backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#86efac', borderRadius: 14, padding: 14, marginBottom: 8 },
  freeTag: { backgroundColor: '#16a34a', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 6 },
  freeTagText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  mealName: { fontSize: 15, fontWeight: '800', color: '#1c1917', marginBottom: 4 },
  mealTime: { fontSize: 12, color: '#16a34a', marginBottom: 2 },
  mealLocation: { fontSize: 12, color: '#78716c' },
  canteenGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  canteenCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 12, padding: 12, width: '47%', margin: '1.5%' },
  canteenItem: { fontSize: 13, fontWeight: '700', color: '#1c1917', marginBottom: 2 },
  canteenType: { fontSize: 11, color: '#78716c', marginBottom: 4 },
  canteenPrice: { fontSize: 15, fontWeight: '900', color: '#ea580c' },
  prasadamCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 14, padding: 14, marginBottom: 8 },
  prasadamUnavailable: { opacity: 0.5 },
  prasadamName: { fontSize: 14, fontWeight: '700', color: '#1c1917' },
  prasadamRight: { flexDirection: 'row', alignItems: 'center' },
  prasadamPrice: { fontSize: 15, fontWeight: '900', color: '#ea580c', marginRight: 8 },
  availBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  availText: { fontSize: 11, fontWeight: '700', color: '#16a34a' },
  unavailBadge: { backgroundColor: '#fee2e2', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  unavailText: { fontSize: 11, fontWeight: '700', color: '#dc2626' },
  restaurantCard: { flexDirection: 'row', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 16, marginBottom: 10, overflow: 'hidden' },
  restaurantLeft: { width: 70, backgroundColor: '#fff7ed', justifyContent: 'center', alignItems: 'center' },
  restaurantEmoji: { fontSize: 30 },
  restaurantInfo: { flex: 1, padding: 12 },
  restaurantTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  restaurantName: { fontSize: 14, fontWeight: '800', color: '#1c1917', flex: 1 },
  vegBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  vegText: { fontSize: 9, fontWeight: '700', color: '#16a34a' },
  restaurantType: { fontSize: 12, color: '#78716c', marginBottom: 6 },
  restaurantMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  restaurantDistance: { fontSize: 11, color: '#78716c' },
  restaurantRating: { fontSize: 11, fontWeight: '700', color: '#ea580c' },
  restaurantPrice: { fontSize: 11, color: '#78716c' },
  tipBox: { margin: 16, backgroundColor: '#fef3c7', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#fde68a', marginBottom: 32 },
  tipTitle: { fontSize: 15, fontWeight: '800', color: '#92400e', marginBottom: 6 },
  tipText: { fontSize: 13, color: '#78716c', lineHeight: 20 },
});
