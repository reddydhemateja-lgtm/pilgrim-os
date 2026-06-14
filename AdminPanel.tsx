import { useState } from 'react';
import {
  ScrollView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, ActivityIndicator, Alert
} from 'react-native';

const BACKEND = 'https://pilgrim-os-backend.onrender.com';

type Guide = {
  _id: string;
  name: string;
  phone: string;
  experience: string;
  speciality: string;
  languages: string[];
  status: string;
  createdAt: string;
};

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [adminKey, setAdminKey] = useState('');
  const [inputKey, setInputKey] = useState('');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const fetchGuides = async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND}/api/admin/guides`, {
        headers: { 'x-admin-key': key },
      });
      const data = await res.json();
      if (res.status === 401) {
        setError('Wrong admin key. Try again.');
        setAdminKey('');
        setLoading(false);
        return;
      }
      setGuides(data.data || []);
    } catch (e) {
      setError('Could not reach server.');
    }
    setLoading(false);
  };

  const handleLogin = () => {
    if (!inputKey.trim()) return;
    setAdminKey(inputKey.trim());
    fetchGuides(inputKey.trim());
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`${BACKEND}/api/admin/guides/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      setGuides(prev => prev.map(g => g._id === id ? data.data : g));
      Alert.alert('Done!', `Guide ${status} successfully.`);
    } catch (e) {
      Alert.alert('Error', 'Update failed. Try again.');
    }
    setUpdating(null);
  };

  const filtered = guides.filter(g => filter === 'all' || g.status === filter);
  const counts = {
    all: guides.length,
    pending: guides.filter(g => g.status === 'pending').length,
    verified: guides.filter(g => g.status === 'verified').length,
    rejected: guides.filter(g => g.status === 'rejected').length,
  };

  const statusColor = (status: string) => {
    if (status === 'verified') return { bg: '#d1fae5', text: '#065f46' };
    if (status === 'rejected') return { bg: '#fee2e2', text: '#991b1b' };
    return { bg: '#fef3c7', text: '#92400e' };
  };

  // LOGIN SCREEN
  if (!adminKey) {
    return (
      <ScrollView style={s.container}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={s.loginCard}>
          <Text style={s.loginEmoji}>🛕</Text>
          <Text style={s.loginTitle}>Admin Login</Text>
          <Text style={s.loginSub}>Guide verification portal</Text>
          <TextInput
            placeholder="Enter admin key..."
            value={inputKey}
            onChangeText={setInputKey}
            secureTextEntry
            style={s.loginInput}
            placeholderTextColor="#a8a29e"
          />
          {error ? <Text style={s.errorText}>{error}</Text> : null}
          <TouchableOpacity style={s.loginBtn} onPress={handleLogin}>
            <Text style={s.loginBtnText}>Access Dashboard →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // DASHBOARD
  return (
    <ScrollView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>🛕 Admin Panel</Text>
        <TouchableOpacity onPress={() => { setAdminKey(''); setGuides([]); }}>
          <Text style={s.logoutText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={s.statsRow}>
        {[
          { label: 'Total', val: counts.all, color: '#ea580c' },
          { label: 'Pending', val: counts.pending, color: '#f59e0b' },
          { label: 'Verified', val: counts.verified, color: '#10b981' },
          { label: 'Rejected', val: counts.rejected, color: '#ef4444' },
        ].map(stat => (
          <View key={stat.label} style={s.statCard}>
            <Text style={[s.statVal, { color: stat.color }]}>{stat.val}</Text>
            <Text style={s.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterRow}>
        {['all', 'pending', 'verified', 'rejected'].map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[s.filterTab, filter === f && s.filterTabActive]}
          >
            <Text style={[s.filterText, filter === f && s.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f as keyof typeof counts]})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Refresh */}
      <TouchableOpacity style={s.refreshBtn} onPress={() => fetchGuides(adminKey)}>
        <Text style={s.refreshText}>↻ Refresh</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#ea580c" style={{ marginTop: 40 }} />}
      {!loading && filtered.length === 0 && (
        <Text style={s.emptyText}>No {filter === 'all' ? '' : filter} guides found.</Text>
      )}

      {/* Guide cards */}
      {!loading && filtered.map(guide => {
        const sc = statusColor(guide.status || 'pending');
        return (
          <View key={guide._id} style={s.card}>
            <View style={s.cardTop}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{(guide.name || '?')[0].toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.guideName}>{guide.name}</Text>
                <Text style={s.guideMeta}>📞 {guide.phone}</Text>
                <Text style={s.guideMeta}>🗣️ {Array.isArray(guide.languages) ? guide.languages.join(', ') : '—'}</Text>
                <Text style={s.guideMeta}>⭐ {guide.experience || '—'} yrs · {guide.speciality || '—'}</Text>
              </View>
              <View style={[s.statusBadge, { backgroundColor: sc.bg }]}>
                <Text style={[s.statusText, { color: sc.text }]}>{guide.status || 'pending'}</Text>
              </View>
            </View>

            <Text style={s.dateText}>
              Registered: {guide.createdAt ? new Date(guide.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
            </Text>

            <View style={s.actionRow}>
              {guide.status !== 'verified' && (
                <TouchableOpacity style={s.verifyBtn} onPress={() => updateStatus(guide._id, 'verified')} disabled={updating === guide._id}>
                  <Text style={s.verifyText}>{updating === guide._id ? '...' : '✅ Verify'}</Text>
                </TouchableOpacity>
              )}
              {guide.status !== 'rejected' && (
                <TouchableOpacity style={s.rejectBtn} onPress={() => updateStatus(guide._id, 'rejected')} disabled={updating === guide._id}>
                  <Text style={s.rejectText}>{updating === guide._id ? '...' : '❌ Reject'}</Text>
                </TouchableOpacity>
              )}
              {guide.status !== 'pending' && (
                <TouchableOpacity style={s.resetBtn} onPress={() => updateStatus(guide._id, 'pending')} disabled={updating === guide._id}>
                  <Text style={s.resetText}>↩ Reset</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF5' },
  backBtn: { padding: 16 },
  backText: { color: '#ea580c', fontWeight: '700', fontSize: 14 },
  loginCard: { margin: 24, backgroundColor: '#fff', borderWidth: 1, borderColor: '#fde68a', borderRadius: 24, padding: 32, alignItems: 'center' },
  loginEmoji: { fontSize: 56, marginBottom: 12 },
  loginTitle: { fontSize: 26, fontWeight: '900', color: '#1c1917', marginBottom: 6 },
  loginSub: { fontSize: 14, color: '#78716c', marginBottom: 24 },
  loginInput: { width: '100%', backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fde68a', borderRadius: 12, padding: 14, fontSize: 14, marginBottom: 10 },
  loginBtn: { width: '100%', backgroundColor: '#ea580c', padding: 14, borderRadius: 12, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  errorText: { color: '#ef4444', fontSize: 13, marginBottom: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1c1917', padding: 16 },
  headerTitle: { color: '#fff', fontWeight: '800', fontSize: 16 },
  logoutText: { color: '#ea580c', fontWeight: '700', fontSize: 13 },
  statsRow: { flexDirection: 'row', padding: 16, gap: 8 },
  statCard: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#fde68a', borderRadius: 12, padding: 12, alignItems: 'center' },
  statVal: { fontSize: 26, fontWeight: '900' },
  statLabel: { fontSize: 11, color: '#78716c', marginTop: 2 },
  filterRow: { paddingHorizontal: 16, paddingVertical: 8 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#e7e5e4', backgroundColor: '#fff', marginRight: 8 },
  filterTabActive: { backgroundColor: '#ea580c', borderColor: '#ea580c' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#78716c' },
  filterTextActive: { color: '#fff' },
  refreshBtn: { marginHorizontal: 16, marginBottom: 8, backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fed7aa', padding: 10, borderRadius: 10, alignItems: 'center' },
  refreshText: { color: '#ea580c', fontWeight: '700', fontSize: 13 },
  emptyText: { textAlign: 'center', color: '#a8a29e', marginTop: 60, fontSize: 15 },
  card: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e7e5e4', borderRadius: 16, padding: 16 },
  cardTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ffedd5', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontWeight: '900', color: '#ea580c' },
  guideName: { fontSize: 16, fontWeight: '800', color: '#1c1917', marginBottom: 3 },
  guideMeta: { fontSize: 12, color: '#78716c', marginBottom: 1 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start' },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  dateText: { fontSize: 11, color: '#a8a29e', marginBottom: 12 },
  actionRow: { flexDirection: 'row', gap: 8 },
  verifyBtn: { flex: 1, backgroundColor: '#d1fae5', padding: 10, borderRadius: 10, alignItems: 'center' },
  verifyText: { color: '#065f46', fontWeight: '700', fontSize: 13 },
  rejectBtn: { flex: 1, backgroundColor: '#fee2e2', padding: 10, borderRadius: 10, alignItems: 'center' },
  rejectText: { color: '#991b1b', fontWeight: '700', fontSize: 13 },
  resetBtn: { flex: 1, backgroundColor: '#f5f5f4', padding: 10, borderRadius: 10, alignItems: 'center' },
  resetText: { color: '#57534e', fontWeight: '700', fontSize: 13 },
});