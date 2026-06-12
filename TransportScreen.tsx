import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const BUSES = [
  { from: 'Chennai', departure: '6:00 AM', arrival: '2:00 PM', duration: '8 hrs', price: '₹450', seats: 12, operator: 'APSRTC' },
  { from: 'Hyderabad', departure: '8:00 PM', arrival: '6:00 AM', duration: '10 hrs', price: '₹550', seats: 4, operator: 'APSRTC' },
  { from: 'Bangalore', departure: '9:00 PM', arrival: '7:00 AM', duration: '10 hrs', price: '₹500', seats: 8, operator: 'KSRTC' },
  { from: 'Vijayawada', departure: '5:00 AM', arrival: '11:00 AM', duration: '6 hrs', price: '₹300', seats: 20, operator: 'APSRTC' },
  { from: 'Mumbai', departure: '7:00 PM', arrival: '9:00 AM', duration: '14 hrs', price: '₹950', seats: 2, operator: 'Private' },
];

const TRAINS = [
  { name: 'Sapthagiri Express', from: 'Chennai', departure: '6:15 AM', arrival: '1:05 PM', price: '₹185', seats: 'Available' },
  { name: 'Tirumala Express', from: 'Hyderabad', departure: '6:30 PM', arrival: '7:15 AM', price: '₹245', seats: 'Available' },
  { name: 'Venkatadri Express', from: 'Bangalore', departure: '7:40 PM', arrival: '7:30 AM', price: '₹210', seats: 'Waitlist' },
  { name: 'Padmavathi Express', from: 'Vijayawada', departure: '8:00 AM', arrival: '2:30 PM', price: '₹155', seats: 'Available' },
];

const LOCAL = [
  { type: 'TTD Free Bus', route: 'Tirupati → Tirumala', timing: 'Every 15 mins', price: 'FREE', note: 'For darshan ticket holders' },
  { type: 'APSRTC Bus', route: 'Tirupati → Tirumala', timing: 'Every 30 mins', price: '₹62', note: 'Regular service' },
  { type: 'Shared Auto', route: 'Tirupati city', timing: 'Always available', price: '₹20-50', note: 'Short distances only' },
  { type: 'Taxi/Cab', route: 'Anywhere', timing: 'On demand', price: '₹200+', note: 'OLA/Auto available' },
];

interface Props {
  onBack: () => void;
}

export default function TransportScreen({ onBack }: Props) {
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🚌 Transport</Text>
        <Text style={styles.headerSub}>Buses, trains & local transport to Tirupati</Text>
      </View>

      {/* LOCAL TRANSPORT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛺 Tirupati → Tirumala</Text>
        <Text style={styles.sectionSub}>How to reach the temple from Tirupati city</Text>
        {LOCAL.map((l, i) => (
          <View key={i} style={styles.localCard}>
            <View style={styles.localLeft}>
              <Text style={styles.localType}>{l.type}</Text>
              <Text style={styles.localRoute}>{l.route}</Text>
              <Text style={styles.localTiming}>⏰ {l.timing}</Text>
              <Text style={styles.localNote}>ℹ️ {l.note}</Text>
            </View>
            <View style={styles.localRight}>
              <Text style={[styles.localPrice, l.price === 'FREE' && styles.freePrice]}>
                {l.price}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* BUSES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚌 Buses to Tirupati</Text>
        <Text style={styles.sectionSub}>From major cities — today's schedule</Text>
        {BUSES.map((bus, i) => (
          <View key={i} style={styles.busCard}>
            <View style={styles.busTop}>
              <Text style={styles.busFrom}>From {bus.from}</Text>
              <View style={[styles.operatorBadge,
                bus.operator === 'APSRTC' && styles.apsrtcBadge,
                bus.operator === 'Private' && styles.privateBadge,
              ]}>
                <Text style={styles.operatorText}>{bus.operator}</Text>
              </View>
            </View>
            <View style={styles.busMiddle}>
              <View style={styles.busTime}>
                <Text style={styles.busTimeText}>{bus.departure}</Text>
                <Text style={styles.busLabel}>Departure</Text>
              </View>
              <View style={styles.busDuration}>
                <Text style={styles.busDurationLine}>──────</Text>
                <Text style={styles.busDurationText}>{bus.duration}</Text>
              </View>
              <View style={styles.busTime}>
                <Text style={styles.busTimeText}>{bus.arrival}</Text>
                <Text style={styles.busLabel}>Arrival</Text>
              </View>
            </View>
            <View style={styles.busBottom}>
              <Text style={styles.busSeats}>{bus.seats} seats left</Text>
              <Text style={styles.busPrice}>{bus.price}</Text>
              <TouchableOpacity style={styles.busBtn}>
                <Text style={styles.busBtnText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* TRAINS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚂 Trains to Tirupati</Text>
        <Text style={styles.sectionSub}>Major trains with availability</Text>
        {TRAINS.map((train, i) => (
          <View key={i} style={styles.trainCard}>
            <View style={styles.trainTop}>
              <Text style={styles.trainName}>{train.name}</Text>
              <View style={[styles.seatsBadge, train.seats === 'Waitlist' && styles.waitlistBadge]}>
                <Text style={styles.seatsText}>{train.seats}</Text>
              </View>
            </View>
            <Text style={styles.trainFrom}>From {train.from}</Text>
            <View style={styles.trainBottom}>
              <Text style={styles.trainTime}>{train.departure} → {train.arrival}</Text>
              <Text style={styles.trainPrice}>{train.price}</Text>
              <TouchableOpacity style={styles.busBtn}>
                <Text style={styles.busBtnText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* TIP BOX */}
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Pilgrim Tip</Text>
        <Text style={styles.tipText}>
          TTD provides FREE buses from Tirupati to Tirumala for pilgrims who have darshan tokens. 
          Show your token at the TTD bus stand near railway station.
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
  localCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 14, padding: 14, marginBottom: 8 },
  localLeft: { flex: 1 },
  localType: { fontSize: 14, fontWeight: '800', color: '#1c1917', marginBottom: 2 },
  localRoute: { fontSize: 12, color: '#78716c', marginBottom: 2 },
  localTiming: { fontSize: 11, color: '#ea580c', marginBottom: 2 },
  localNote: { fontSize: 11, color: '#a8a29e' },
  localRight: { marginLeft: 12 },
  localPrice: { fontSize: 16, fontWeight: '900', color: '#ea580c' },
  freePrice: { color: '#16a34a' },
  busCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 16, padding: 14, marginBottom: 10 },
  busTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  busFrom: { fontSize: 15, fontWeight: '800', color: '#1c1917' },
  operatorBadge: { backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  apsrtcBadge: { backgroundColor: '#dcfce7' },
  privateBadge: { backgroundColor: '#fef3c7' },
  operatorText: { fontSize: 10, fontWeight: '700', color: '#44403c' },
  busMiddle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  busTime: { alignItems: 'center' },
  busTimeText: { fontSize: 16, fontWeight: '900', color: '#1c1917' },
  busLabel: { fontSize: 10, color: '#78716c', marginTop: 2 },
  busDuration: { alignItems: 'center' },
  busDurationLine: { fontSize: 10, color: '#d4d4d4' },
  busDurationText: { fontSize: 11, color: '#78716c' },
  busBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#fde68a', paddingTop: 10 },
  busSeats: { fontSize: 12, color: '#ea580c', fontWeight: '600' },
  busPrice: { fontSize: 16, fontWeight: '900', color: '#1c1917' },
  busBtn: { backgroundColor: '#ea580c', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  busBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  trainCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 16, padding: 14, marginBottom: 10 },
  trainTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  trainName: { fontSize: 14, fontWeight: '800', color: '#1c1917', flex: 1 },
  seatsBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  waitlistBadge: { backgroundColor: '#fee2e2' },
  seatsText: { fontSize: 10, fontWeight: '700', color: '#44403c' },
  trainFrom: { fontSize: 12, color: '#78716c', marginBottom: 8 },
  trainBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trainTime: { fontSize: 12, fontWeight: '600', color: '#1c1917' },
  trainPrice: { fontSize: 15, fontWeight: '900', color: '#ea580c' },
  tipBox: { margin: 16, backgroundColor: '#fef3c7', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#fde68a', marginBottom: 32 },
  tipTitle: { fontSize: 15, fontWeight: '800', color: '#92400e', marginBottom: 6 },
  tipText: { fontSize: 13, color: '#78716c', lineHeight: 20 },
});