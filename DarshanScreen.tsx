import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const SLOTS = [
  { time: '3:00 AM - 6:00 AM', type: 'Sarva Darshan', tokens: 450, available: true },
  { time: '6:00 AM - 9:00 AM', type: 'Sarva Darshan', tokens: 120, available: true },
  { time: '9:00 AM - 12:00 PM', type: 'Sarva Darshan', tokens: 0, available: false },
  { time: '12:00 PM - 3:00 PM', type: 'Special Entry', tokens: 80, available: true },
  { time: '3:00 PM - 6:00 PM', type: 'Sarva Darshan', tokens: 0, available: false },
  { time: '6:00 PM - 9:00 PM', type: 'Sarva Darshan', tokens: 210, available: true },
];

const SEVAS = [
  { name: 'Suprabhatam', time: '3:00 AM', price: '₹300' },
  { name: 'Thomala Seva', time: '4:30 AM', price: '₹500' },
  { name: 'Archana', time: 'All day', price: '₹120' },
  { name: 'Kalyanotsavam', time: '8:00 AM', price: '₹750' },
  { name: 'Unjal Seva', time: '6:00 PM', price: '₹500' },
  { name: 'Dolotsavam', time: '7:00 PM', price: '₹400' },
];

interface Props {
  onBack: () => void;
}

export default function DarshanScreen({ onBack }: Props) {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🛕 Darshan Slots</Text>
        <Text style={styles.headerSub}>Live data updated every 10 seconds</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.dateBar}>
        <Text style={styles.dateText}>📅 Today — {new Date().toDateString()}</Text>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change date</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ Data sourced from TTD official website. Always verify at ttdsevaonline.com
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Darshan Timings</Text>
        {SLOTS.map((slot, i) => (
          <View key={i} style={[styles.slotCard, !slot.available && styles.slotUnavailable]}>
            <View style={styles.slotLeft}>
              <Text style={styles.slotTime}>{slot.time}</Text>
              <Text style={styles.slotType}>{slot.type}</Text>
            </View>
            <View style={styles.slotRight}>
              {slot.available ? (
                <View>
                  <Text style={styles.slotTokens}>{slot.tokens} tokens</Text>
                  <View style={styles.availableBadge}>
                    <Text style={styles.availableText}>Available</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.fullBadge}>
                  <Text style={styles.fullText}>Housefull</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.notifySection}>
        <Text style={styles.notifyTitle}>🔔 Want to know when new tokens release?</Text>
        <Text style={styles.notifySub}>We'll alert you the moment TTD releases new slots</Text>
        <TouchableOpacity style={styles.notifyBtn}>
          <Text style={styles.notifyBtnText}>Notify me instantly →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Sevas</Text>
        {SEVAS.map((seva, i) => (
          <View key={i} style={styles.sevaCard}>
            <View>
              <Text style={styles.sevaName}>{seva.name}</Text>
              <Text style={styles.sevaTime}>⏰ {seva.time}</Text>
            </View>
            <View style={styles.sevaRight}>
              <Text style={styles.sevaPrice}>{seva.price}</Text>
              <TouchableOpacity style={styles.sevaBtn}>
                <Text style={styles.sevaBtnText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.queueSection}>
        <Text style={styles.queueTitle}>📊 Current Queue Status</Text>
        <View style={styles.queueGrid}>
          {[
            ['~45 min', 'Special Entry wait'],
            ['~3 hrs', 'Sarva Darshan wait'],
            ['12°C', 'Temple temperature'],
            ['Low', 'Current crowd level'],
          ].map(([val, label]) => (
            <View key={label} style={styles.queueCard}>
              <Text style={styles.queueVal}>{val}</Text>
              <Text style={styles.queueLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF5' },
  header: { backgroundColor: '#ea580c', padding: 24, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: 8 },
  backText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 13, color: '#fed7aa', marginBottom: 10 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e', marginRight: 6 },
  liveText: { fontSize: 11, fontWeight: '800', color: '#22c55e', letterSpacing: 2 },
  dateBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff7ed', borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  dateText: { fontSize: 13, fontWeight: '600', color: '#1c1917' },
  changeBtn: { backgroundColor: '#ea580c', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  changeBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  disclaimer: { backgroundColor: '#fef3c7', padding: 12, borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  disclaimerText: { fontSize: 11, color: '#92400e', textAlign: 'center' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1c1917', marginBottom: 12 },
  slotCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 14, padding: 16, marginBottom: 8 },
  slotUnavailable: { backgroundColor: '#f5f5f4', borderColor: '#e7e5e4', opacity: 0.7 },
  slotLeft: { flex: 1 },
  slotTime: { fontSize: 14, fontWeight: '700', color: '#1c1917', marginBottom: 2 },
  slotType: { fontSize: 12, color: '#78716c' },
  slotRight: { alignItems: 'flex-end' },
  slotTokens: { fontSize: 13, fontWeight: '700', color: '#ea580c', marginBottom: 4 },
  availableBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  availableText: { fontSize: 11, fontWeight: '700', color: '#16a34a' },
  fullBadge: { backgroundColor: '#fee2e2', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  fullText: { fontSize: 11, fontWeight: '700', color: '#dc2626' },
  notifySection: { margin: 16, backgroundColor: '#1c1917', borderRadius: 20, padding: 20, alignItems: 'center' },
  notifyTitle: { fontSize: 16, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 6 },
  notifySub: { fontSize: 12, color: '#a8a29e', textAlign: 'center', marginBottom: 16 },
  notifyBtn: { backgroundColor: '#ea580c', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  notifyBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  sevaCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 14, padding: 16, marginBottom: 8 },
  sevaName: { fontSize: 14, fontWeight: '700', color: '#1c1917', marginBottom: 2 },
  sevaTime: { fontSize: 12, color: '#78716c' },
  sevaRight: { alignItems: 'flex-end' },
  sevaPrice: { fontSize: 15, fontWeight: '800', color: '#ea580c', marginBottom: 6 },
  sevaBtn: { backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#ea580c', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10 },
  sevaBtnText: { fontSize: 12, fontWeight: '700', color: '#ea580c' },
  queueSection: { margin: 16, backgroundColor: '#fff7ed', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#fde68a', marginBottom: 32 },
  queueTitle: { fontSize: 16, fontWeight: '800', color: '#1c1917', marginBottom: 16 },
  queueGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  queueCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', width: '47%', borderWidth: 1, borderColor: '#fde68a', margin: '1.5%' },
  queueVal: { fontSize: 20, fontWeight: '900', color: '#ea580c', marginBottom: 4 },
  queueLabel: { fontSize: 11, color: '#78716c', textAlign: 'center' },
});