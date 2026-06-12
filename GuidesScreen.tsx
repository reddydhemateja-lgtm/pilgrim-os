import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const GUIDES = [
  {
    name: 'Ravi Kumar',
    languages: ['Telugu', 'Hindi', 'English'],
    experience: '8 years',
    rating: '4.9',
    price: '₹500/day',
    speciality: 'Temple rituals & sevas expert',
    verified: true,
    tours: 1240,
  },
  {
    name: 'Lakshmi Devi',
    languages: ['Telugu', 'Tamil', 'Kannada'],
    experience: '5 years',
    rating: '4.8',
    price: '₹400/day',
    speciality: 'South Indian pilgrim specialist',
    verified: true,
    tours: 890,
  },
  {
    name: 'Mohammed Farooq',
    languages: ['Hindi', 'Urdu', 'English'],
    experience: '6 years',
    rating: '4.7',
    price: '₹450/day',
    speciality: 'North Indian pilgrim specialist',
    verified: true,
    tours: 654,
  },
  {
    name: 'Priya Sharma',
    languages: ['Hindi', 'Bengali', 'English'],
    experience: '3 years',
    rating: '4.6',
    price: '₹350/day',
    speciality: 'First time pilgrim guide',
    verified: true,
    tours: 320,
  },
  {
    name: 'Suresh Babu',
    languages: ['Telugu', 'Malayalam'],
    experience: '10 years',
    rating: '5.0',
    price: '₹600/day',
    speciality: 'VIP darshan & seva bookings',
    verified: true,
    tours: 2100,
  },
];

const SERVICES = [
  { icon: '🛕', title: 'Temple Tour', desc: 'Complete guided tour of temple complex & history' },
  { icon: '📋', title: 'Seva Booking', desc: 'Help booking sevas & understanding rituals' },
  { icon: '🏨', title: 'Hotel Assistance', desc: 'Find & negotiate best hotel deals for pilgrims' },
  { icon: '🚌', title: 'Transport Help', desc: 'Arrange transport from city to temple & back' },
];
interface Props {
  onBack: () => void;
  onRegister: () => void;
}

export default function GuidesScreen({ onBack, onRegister }: Props) {
  return (
    <ScrollView style={styles.container}>
{/* HEADER */}
<View style={styles.header}>
  <TouchableOpacity onPress={onBack} style={styles.backBtn}>
    <Text style={styles.backText}>← Back</Text>
  </TouchableOpacity>
  <Text style={styles.headerTitle}>🗺️ Local Guides</Text>
  <Text style={styles.headerSub}>Verified guides who speak your language</Text>
</View>

      {/* SERVICES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What guides help with</Text>
        <View style={styles.servicesGrid}>
          {SERVICES.map((s, i) => (
            <View key={i} style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>{s.icon}</Text>
              <Text style={styles.serviceTitle}>{s.title}</Text>
              <Text style={styles.serviceDesc}>{s.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* GUIDES LIST */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Verified Guides</Text>
        <Text style={styles.sectionSub}>All guides are Aadhar & TTD license verified</Text>
        {GUIDES.map((guide, i) => (
          <View key={i} style={styles.guideCard}>

            {/* Avatar */}
            <View style={styles.guideTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {guide.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.guideInfo}>
                <View style={styles.guideNameRow}>
                  <Text style={styles.guideName}>{guide.name}</Text>
                  {guide.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✅ Verified</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.guideSpeciality}>{guide.speciality}</Text>
                <View style={styles.guideMeta}>
                  <Text style={styles.guideRating}>⭐ {guide.rating}</Text>
                  <Text style={styles.guideTours}>🗺️ {guide.tours} tours</Text>
                  <Text style={styles.guideExp}>📅 {guide.experience}</Text>
                </View>
              </View>
            </View>

            {/* Languages */}
            <View style={styles.languagesRow}>
              {guide.languages.map((lang) => (
                <View key={lang} style={styles.langBadge}>
                  <Text style={styles.langText}>{lang}</Text>
                </View>
              ))}
            </View>

            {/* Bottom */}
            <View style={styles.guideBottom}>
              <Text style={styles.guidePrice}>{guide.price}</Text>
              <TouchableOpacity style={styles.contactBtn}>
                <Text style={styles.contactBtnText}>Contact Guide →</Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </View>

      {/* BECOME GUIDE */}
      <View style={styles.becomeSection}>
        <Text style={styles.becomeTitle}>🗺️ Are you a local guide?</Text>
        <Text style={styles.becomeSub}>
          Join PilgrimOS and reach thousands of pilgrims every month. Free to register.
        </Text>
<TouchableOpacity style={styles.becomeBtn} onPress={onRegister}>
          <Text style={styles.becomeBtnText}>Register as Guide →</Text>
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
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1c1917', marginBottom: 4 },
  sectionSub: { fontSize: 12, color: '#78716c', marginBottom: 12 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  serviceCard: { backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 14, padding: 14, width: '47%', margin: '1.5%' },
  serviceIcon: { fontSize: 28, marginBottom: 6 },
  serviceTitle: { fontSize: 13, fontWeight: '800', color: '#1c1917', marginBottom: 4 },
  serviceDesc: { fontSize: 11, color: '#78716c', lineHeight: 16 },
  guideCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 16, padding: 16, marginBottom: 12 },
  guideTop: { flexDirection: 'row', marginBottom: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#ea580c', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 22, fontWeight: '900', color: '#fff' },
  guideInfo: { flex: 1 },
  guideNameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  guideName: { fontSize: 15, fontWeight: '800', color: '#1c1917', marginRight: 6 },
  verifiedBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  verifiedText: { fontSize: 10, fontWeight: '700', color: '#16a34a' },
  guideSpeciality: { fontSize: 12, color: '#78716c', marginBottom: 6 },
  guideMeta: { flexDirection: 'row' },
  guideRating: { fontSize: 11, fontWeight: '700', color: '#ea580c', marginRight: 8 },
  guideTours: { fontSize: 11, color: '#78716c', marginRight: 8 },
  guideExp: { fontSize: 11, color: '#78716c' },
  languagesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  langBadge: { backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fed7aa', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginRight: 6, marginBottom: 4 },
  langText: { fontSize: 11, fontWeight: '600', color: '#ea580c' },
  guideBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#fde68a', paddingTop: 12 },
  guidePrice: { fontSize: 17, fontWeight: '900', color: '#ea580c' },
  contactBtn: { backgroundColor: '#ea580c', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  contactBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  becomeSection: { margin: 16, backgroundColor: '#1c1917', borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 32 },
  becomeTitle: { fontSize: 16, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 6 },
  becomeSub: { fontSize: 12, color: '#a8a29e', textAlign: 'center', marginBottom: 16 },
  becomeBtn: { backgroundColor: '#ea580c', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 },
  becomeBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
