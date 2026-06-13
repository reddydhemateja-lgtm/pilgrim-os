import { ScrollView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useState, useEffect } from 'react';

interface Slot {
  time: string;
  type: string;
  tokens: string;
  available: boolean;
  waitTime: string;
  totalPilgrims: string;
  queueLocation: string;
  source: string;
}

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
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [error, setError] = useState(false);

  const fetchDarshan = async () => {
    try {
      const response = await fetch('https://pilgrim-os-backend.onrender.com/api/darshan');
      const data = await response.json();
      if (data.success) {
        setSlots(data.data);
        setLastUpdated(data.lastUpdated);
        setError(false);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDarshan();
    const interval = setInterval(fetchDarshan, 10000);
    return () => clearInterval(interval);
  }, []);

 const openTTD = () => {
    if (typeof window !== 'undefined') {
      window.open('https://ttdevasthanams.ap.gov.in', '_blank');
    } else {
      Linking.openURL('https://ttdevasthanams.ap.gov.in');
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🛕 Darshan Slots</Text>
        <Text style={styles.headerSub}>
          {lastUpdated ? `Updated: ${new Date(lastUpdated).toLocaleTimeString()}` : 'Fetching live data...'}
        </Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* DATE BAR */}
      <View style={styles.dateBar}>
        <Text style={styles.dateText}>📅 Today — {new Date().toDateString()}</Text>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change date</Text>
        </TouchableOpacity>
      </View>

      {/* DISCLAIMER */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ Data sourced from TTD News. Always verify at ttdevasthanams.ap.gov.in
        </Text>
      </View>

      {/* LIVE STATS */}
      {slots.length > 0 && (
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{slots[0]?.totalPilgrims || 'N/A'}</Text>
            <Text style={styles.statLabel}>Pilgrims Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{slots[0]?.waitTime || 'N/A'}</Text>
            <Text style={styles.statLabel}>Sarva Darshan Wait</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{slots[0]?.queueLocation || 'N/A'}</Text>
            <Text style={styles.statLabel}>Queue Location</Text>
          </View>
        </View>
      )}

      {/* SLOTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Darshan Timings</Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#ea580c" />
            <Text style={styles.loadingText}>Fetching live TTD data...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ Could not connect to server.</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchDarshan}>
              <Text style={styles.retryBtnText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          slots.map((slot, i) => (
            <View key={i} style={styles.slotCard}>
              <View style={styles.slotLeft}>
                <Text style={styles.slotTime}>{slot.time}</Text>
                <Text style={styles.slotType}>{slot.type}</Text>
                <Text style={styles.slotSource}>Source: {slot.source}</Text>
              </View>
              <View style={styles.slotRight}>
                {slot.type.includes('Special Entry') ? (
                  <TouchableOpacity style={styles.bookBtn} onPress={openTTD}>
                    <Text style={styles.bookBtnText}>Book ₹300 →</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.slotTokens}>{slot.tokens}</Text>
                )}
                <View style={styles.availableBadge}>
                  <Text style={styles.availableText}>Available</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* NOTIFY */}
      <View style={styles.notifySection}>
        <Text style={styles.notifyTitle}>🔔 Get notified when tickets release!</Text>
        <Text style={styles.notifySub}>We'll alert you the moment TTD releases new slots</Text>
        <TouchableOpacity style={styles.notifyBtn}>
          <Text style={styles.notifyBtnText}>Notify me instantly →</Text>
        </TouchableOpacity>
      </View>

      {/* BOOK ON TTD */}
      <View style={styles.ttdSection}>
        <Text style={styles.ttdTitle}>🎫 Book Tickets on TTD Official</Text>
        <Text style={styles.ttdSub}>Special Entry ₹300 • VIP Darshan • Sevas</Text>
        <TouchableOpacity style={styles.ttdBtn} onPress={openTTD}>
          <Text style={styles.ttdBtnText}>Open TTD Official Website →</Text>
        </TouchableOpacity>
      </View>

      {/* SEVAS */}
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
              <TouchableOpacity style={styles.sevaBtn} onPress={openTTD}>
                <Text style={styles.sevaBtnText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* QUEUE STATUS */}
      <View style={styles.queueSection}>
        <Text style={styles.queueTitle}>📊 Current Queue Status</Text>
        <View style={styles.queueGrid}>
          {[
            [slots[0]?.waitTime || 'N/A', 'Sarva Darshan wait'],
            ['1-2 hrs', 'Special Entry wait'],
            [slots[0]?.totalPilgrims || 'N/A', 'Pilgrims today'],
            [slots[0]?.queueLocation || 'N/A', 'Queue location'],
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
  statsRow: { flexDirection: 'row', padding: 12, backgroundColor: '#fff7ed', borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  statCard: { flex: 1, alignItems: 'center', padding: 8 },
  statVal: { fontSize: 13, fontWeight: '900', color: '#ea580c', textAlign: 'center' },
  statLabel: { fontSize: 10, color: '#78716c', textAlign: 'center', marginTop: 2 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1c1917', marginBottom: 12 },
  loadingBox: { alignItems: 'center', padding: 32 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#78716c' },
  errorBox: { backgroundColor: '#fee2e2', borderRadius: 14, padding: 16, alignItems: 'center' },
  errorText: { fontSize: 13, color: '#dc2626', marginBottom: 10 },
  retryBtn: { backgroundColor: '#ea580c', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
  retryBtnText: { color: '#fff', fontWeight: '700' },
  slotCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 14, padding: 16, marginBottom: 8 },
  slotLeft: { flex: 1 },
  slotTime: { fontSize: 14, fontWeight: '700', color: '#1c1917', marginBottom: 2 },
  slotType: { fontSize: 12, color: '#78716c' },
  slotSource: { fontSize: 10, color: '#a8a29e', marginTop: 2 },
  slotRight: { alignItems: 'flex-end' },
  slotTokens: { fontSize: 11, color: '#ea580c', marginBottom: 4, textAlign: 'right' },
  bookBtn: { backgroundColor: '#ea580c', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginBottom: 4 },
  bookBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  availableBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  availableText: { fontSize: 11, fontWeight: '700', color: '#16a34a' },
  notifySection: { margin: 16, backgroundColor: '#1c1917', borderRadius: 20, padding: 20, alignItems: 'center' },
  notifyTitle: { fontSize: 16, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 6 },
  notifySub: { fontSize: 12, color: '#a8a29e', textAlign: 'center', marginBottom: 16 },
  notifyBtn: { backgroundColor: '#ea580c', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  notifyBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  ttdSection: { margin: 16, backgroundColor: '#fff7ed', borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#fde68a' },
  ttdTitle: { fontSize: 16, fontWeight: '800', color: '#1c1917', textAlign: 'center', marginBottom: 4 },
  ttdSub: { fontSize: 12, color: '#78716c', textAlign: 'center', marginBottom: 16 },
  ttdBtn: { backgroundColor: '#ea580c', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  ttdBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
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
  queueVal: { fontSize: 14, fontWeight: '900', color: '#ea580c', marginBottom: 4, textAlign: 'center' },
  queueLabel: { fontSize: 11, color: '#78716c', textAlign: 'center' },
});