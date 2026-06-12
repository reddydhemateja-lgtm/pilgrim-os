import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import DarshanScreen from './DarshanScreen';
import Hotels from './Hotels';
import TransportScreen from './TransportScreen';
import FoodScreen from './FoodScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  if (screen === 'darshan') return <DarshanScreen onBack={() => setScreen('home')} />;
if (screen === 'hotels') return <Hotels onBack={() => setScreen('home')} />;
if (screen === 'transport') return <TransportScreen onBack={() => setScreen('home')} />;
if (screen === 'food') return <FoodScreen onBack={() => setScreen('home')} />;
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      {/* NAVBAR */}
      <View style={styles.nav}>
        <Text style={styles.navLogo}>🛕 PilgrimOS</Text>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navBtnText}>Plan Trip →</Text>
        </TouchableOpacity>
      </View>

      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroTag}>✦ Tirupati's Pilgrim Companion</Text>
        <Text style={styles.heroTitle}>Your darshan,{'\n'}planned perfectly.</Text>
        <Text style={styles.heroSub}>Live darshan slots, hotels, transport & food — in 8 languages. No confusion. No wrong queues.</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>📅</Text>
          <TextInput placeholder="Select your visit date..." style={styles.searchInput} placeholderTextColor="#a8a29e" />
        </View>
        <TouchableOpacity style={styles.heroBtn} onPress={() => setScreen('darshan')}>
          <Text style={styles.heroBtnText}>Check Darshan Slots →</Text>
        </TouchableOpacity>
        <Text style={styles.heroNote}>Live TTD data • Free • No login needed</Text>
        <Text style={styles.templeEmoji}>⛩️</Text>
      </View>

      {/* STATS */}
      <View style={styles.stats}>
        {[['50K+','Pilgrims daily'],['300+','Hotels listed'],['12','Seva types'],['24/7','Live updates']].map(([val, label]) => (
          <View key={label} style={styles.statItem}>
            <Text style={styles.statVal}>{val}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* FEATURES */}
      <View style={styles.section}>
        <Text style={styles.sectionTag}>EVERYTHING YOU NEED</Text>
        <Text style={styles.sectionTitle}>One app. Complete pilgrimage.</Text>
        <View style={styles.featGrid}>
          {[
            ['🛕','Live Darshan Slots','Real-time queue updates and TTD timings.', 'darshan'],
            ['🏨','Hotels Near Temple','Browse by distance, budget and rating.', 'hotels'],
            ['🚌','Transport & Routes','APSRTC buses and trains, live schedules.', 'transport'],
            ['🍛','Prasadam & Food','Annadanam timings and trusted restaurants.', 'food'],
            ['🗺️','Local Guides','Verified guides in your language.', ''],
            ['🌐','8 Languages','Telugu, Hindi, Tamil, English and more.', ''],
          ].map(([icon, title, desc, nav]) => (
            <TouchableOpacity key={title} style={styles.featCard} onPress={() => nav && setScreen(nav)}>
              <Text style={styles.featIcon}>{icon}</Text>
              <Text style={styles.featTitle}>{title}</Text>
              <Text style={styles.featDesc}>{desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <Text style={styles.ctaEmoji}>🙏</Text>
        <Text style={styles.ctaTitle}>Your next darshan starts here.</Text>
        <Text style={styles.ctaSub}>Join thousands of pilgrims who plan smarter.</Text>
        <TouchableOpacity style={styles.ctaBtn}>
          <Text style={styles.ctaBtnText}>Plan my Tirupati visit →</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>🛕 PilgrimOS — Built with ❤️ in Tirupati, AP</Text>
        <Text style={styles.footerSub}>Not affiliated with TTD</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF5' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFFBF5', borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  navLogo: { fontSize: 18, fontWeight: '800', color: '#c2410c' },
  navBtn: { backgroundColor: '#ea580c', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  navBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  hero: { backgroundColor: '#fff7ed', padding: 24, alignItems: 'center' },
  heroTag: { backgroundColor: '#ffedd5', color: '#ea580c', fontSize: 11, fontWeight: '700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16, letterSpacing: 1 },
  heroTitle: { fontSize: 36, fontWeight: '900', color: '#1c1917', textAlign: 'center', lineHeight: 42, marginBottom: 12 },
  heroSub: { fontSize: 15, color: '#78716c', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#fde68a', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, width: '100%', marginBottom: 12 },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1c1917' },
  heroBtn: { backgroundColor: '#ea580c', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14, width: '100%', alignItems: 'center', marginBottom: 10 },
  heroBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  heroNote: { fontSize: 12, color: '#a8a29e', marginBottom: 16 },
  templeEmoji: { fontSize: 64, marginTop: 8 },
  stats: { flexDirection: 'row', backgroundColor: '#ea580c', paddingVertical: 20, paddingHorizontal: 8 },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '900', color: '#fff' },
  statLabel: { fontSize: 11, color: '#fed7aa', marginTop: 2, textAlign: 'center' },
  section: { padding: 24 },
  sectionTag: { color: '#ea580c', fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  sectionTitle: { fontSize: 26, fontWeight: '900', color: '#1c1917', marginBottom: 20 },
  featGrid: { gap: 12 },
  featCard: { backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 16, padding: 18, marginBottom: 4 },
  featIcon: { fontSize: 32, marginBottom: 8 },
  featTitle: { fontSize: 16, fontWeight: '800', color: '#1c1917', marginBottom: 4 },
  featDesc: { fontSize: 13, color: '#78716c', lineHeight: 18 },
  cta: { backgroundColor: '#ea580c', padding: 32, alignItems: 'center', margin: 16, borderRadius: 24 },
  ctaEmoji: { fontSize: 48, marginBottom: 12 },
  ctaTitle: { fontSize: 26, fontWeight: '900', color: '#fff', textAlign: 'center', marginBottom: 8 },
  ctaSub: { fontSize: 14, color: '#fed7aa', textAlign: 'center', marginBottom: 20 },
  ctaBtn: { backgroundColor: '#fff', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 30 },
  ctaBtnText: { color: '#ea580c', fontWeight: '800', fontSize: 15 },
  footer: { backgroundColor: '#1c1917', padding: 24, alignItems: 'center' },
  footerText: { color: '#fff', fontWeight: '700', fontSize: 13, marginBottom: 4 },
  footerSub: { color: '#78716c', fontSize: 12 },
});