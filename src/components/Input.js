import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../constants/theme';

const Input = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={theme.colors.gray} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} keyboardType={keyboardType} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: theme.spacing.md },
  input: { backgroundColor: theme.colors.secondary, padding: 15, borderRadius: theme.borderRadius.md, fontSize: 16, color: theme.colors.text, borderWidth: 1, borderColor: '#ddd' },
});
export default Input;