import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../theme';
import { Icon } from '../icons';

interface EmergencySearchBarProps {
  onSearchChange?: (query: string) => void;
  placeholder?: string;
}

const EmergencySearchBar: React.FC<EmergencySearchBarProps> = ({
  onSearchChange,
  placeholder = "응급 상황 검색..."
}) => {
  const [query, setQuery] = useState('');

  const handleTextChange = (text: string) => {
    setQuery(text);
    onSearchChange?.(text);
  };

  const clearSearch = () => {
    setQuery('');
    onSearchChange?.('');
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Icon name="search" size={18} color={colors.text.tertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          value={query}
          onChangeText={handleTextChange}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="close" size={16} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
    fontFamily: 'Pretendard-Regular',
  },
  clearButton: {
    padding: 4,
  },
});

export default EmergencySearchBar;
