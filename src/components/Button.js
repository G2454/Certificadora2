import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';

const Button = ({ title, onPress, variant = 'primary', disabled = false, loading = false }) => {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.gray;
    switch (variant) {
      case 'danger': return theme.colors.danger;
      case 'success': return theme.colors.success;
      default: return theme.colors.primary;
    }
  };
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: getBackgroundColor() }]} onPress={onPress} disabled={disabled || loading}>
      {loading ? <ActivityIndicator color={theme.colors.white} /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: { paddingVertical: 14, paddingHorizontal: theme.spacing.lg, borderRadius: theme.borderRadius.md, alignItems: 'center', width: '100%', elevation: 2 },
  text: { color: theme.colors.white, fontSize: 16, fontWeight: 'bold' },
});
export default Button;