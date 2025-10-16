import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "검색어를 입력하세요"
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch?.(text);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <View style={styles.searchContainer}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={query}
        onChangeText={handleSearch}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 48,
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
    color: colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: 'Pretendard-Regular',
  },
  clearButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  clearIcon: {
    fontSize: 16,
    color: colors.textTertiary,
    fontWeight: '600',
  },
});

export default SearchBar;
