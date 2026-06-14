import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

const LANGUAGES = ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'English'];

interface Props {
  onBack: () => void;
}

export default function GuideRegister({ onBack }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [experience, setExperience] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const toggleLanguage = (lang: string) => {
    if (selectedLangs.includes(lang)) {
      setSelectedLangs(selectedLangs.filter((l) => l !== lang));
    } else {
      setSelectedLangs([...selectedLangs, lang]);
    }
  };

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!name || name.trim().length < 3) newErrors.name = '❌ Name must be at least 3 characters';
    if (!phone || !/^\d{10}$/.test(phone)) newErrors.phone = '❌ Enter valid 10 digit mobile number';
    if (!aadhar || !/^\d{12}$/.test(aadhar)) newErrors.aadhar = '❌ Enter valid 12 digit Aadhar number';
    if (selectedLangs.length === 0) newErrors.languages = '❌ Select at least one language';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const response = await fetch('https://pilgrim-os-backend.onrender.com/api/guides/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, aadhar, experience, speciality, languages: selectedLangs }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Connection error. Please try again.');
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>🎉</Text>
        <Text style={styles.successTitle}>Application Submitted!</Text>
        <Text style={styles.successSub}>
          We will verify your Aadhar and TTD license within 2-3 working days. You'll receive a WhatsApp confirmation on {phone}.
        </Text>
        <TouchableOpacity style={styles.successBtn} onPress={onBack}>
          <Text style={styles.successBtnText}>Back to Guides →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🗺️ Register as Guide</Text>
        <Text style={styles.headerSub}>Join PilgrimOS and reach lakhs of pilgrims</Text>
      </View>

      {/* BENEFITS */}
      <View style={styles.benefitsRow}>
        {['Free listing', 'Verified badge', 'Direct bookings'].map((b) => (
          <View key={b} style={styles.benefitChip}>
            <Text style={styles.benefitText}>✅ {b}</Text>
          </View>
        ))}
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Your Details</Text>

        {/* NAME */}
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="Enter your full name"
          placeholderTextColor="#a8a29e"
          value={name}
          onChangeText={(text) => { setName(text); setErrors({...errors, name: ''}); }}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        {/* PHONE */}
        <Text style={styles.label}>WhatsApp Number *</Text>
        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : null]}
          placeholder="Enter 10 digit mobile number"
          placeholderTextColor="#a8a29e"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={(text) => { setPhone(text); setErrors({...errors, phone: ''}); }}
        />
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

        {/* AADHAR */}
        <Text style={styles.label}>Aadhar Number *</Text>
        <TextInput
          style={[styles.input, errors.aadhar ? styles.inputError : null]}
          placeholder="Enter 12 digit Aadhar number"
          placeholderTextColor="#a8a29e"
          keyboardType="number-pad"
          maxLength={12}
          value={aadhar}
          onChangeText={(text) => { setAadhar(text); setErrors({...errors, aadhar: ''}); }}
        />
        {errors.aadhar ? <Text style={styles.errorText}>{errors.aadhar}</Text> : null}

        {/* EXPERIENCE */}
        <Text style={styles.label}>Years of Experience</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5 years"
          placeholderTextColor="#a8a29e"
          value={experience}
          onChangeText={setExperience}
        />

        {/* SPECIALITY */}
        <Text style={styles.label}>Your Speciality</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Temple rituals & seva expert"
          placeholderTextColor="#a8a29e"
          value={speciality}
          onChangeText={setSpeciality}
        />

        {/* LANGUAGES */}
        <Text style={styles.label}>Languages You Speak *</Text>
        {errors.languages ? <Text style={styles.errorText}>{errors.languages}</Text> : null}
        <View style={styles.languagesGrid}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[styles.langChip, selectedLangs.includes(lang) && styles.langChipSelected]}
              onPress={() => toggleLanguage(lang)}
            >
              <Text style={[styles.langChipText, selectedLangs.includes(lang) && styles.langChipTextSelected]}>
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            📋 After submission we will verify your Aadhar card and TTD guide license before activating your profile. This usually takes 2-3 working days.
          </Text>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit Application →</Text>
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
  benefitsRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff7ed', borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  benefitChip: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  benefitText: { fontSize: 11, fontWeight: '700', color: '#16a34a' },
  form: { padding: 16 },
  formTitle: { fontSize: 18, fontWeight: '900', color: '#1c1917', marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: '#1c1917', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fed7aa', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#1c1917' },
  inputError: { borderColor: '#dc2626', borderWidth: 2 },
  errorText: { color: '#dc2626', fontSize: 12, marginTop: 4 },
  languagesGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  langChip: { borderWidth: 1, borderColor: '#fed7aa', backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  langChipSelected: { backgroundColor: '#ea580c', borderColor: '#ea580c' },
  langChipText: { fontSize: 12, fontWeight: '600', color: '#78716c' },
  langChipTextSelected: { color: '#fff' },
  noteBox: { backgroundColor: '#fef3c7', borderRadius: 12, padding: 14, marginTop: 16, borderWidth: 1, borderColor: '#fde68a' },
  noteText: { fontSize: 12, color: '#92400e', lineHeight: 18 },
  submitBtn: { backgroundColor: '#ea580c', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  successContainer: { flex: 1, backgroundColor: '#FFFBF5', justifyContent: 'center', alignItems: 'center', padding: 32 },
  successEmoji: { fontSize: 80, marginBottom: 20 },
  successTitle: { fontSize: 28, fontWeight: '900', color: '#1c1917', marginBottom: 12, textAlign: 'center' },
  successSub: { fontSize: 14, color: '#78716c', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  successBtn: { backgroundColor: '#ea580c', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 24 },
  successBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
}); 
