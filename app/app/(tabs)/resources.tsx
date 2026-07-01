import { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ELEMENTS } from '../../lib/constants'

export default function ResourcesScreen() {
  const [search, setSearch] = useState('')
  const [activeElement, setActiveElement] = useState<string>('all')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView style={styles.list}>
        {ELEMENTS.map((element) => (
          <TouchableOpacity
            key={element.slug}
            style={[
              styles.elementRow,
              activeElement === element.slug && styles.elementRowActive,
            ]}
            onPress={() => setActiveElement(element.slug)}
          >
            <Text
              style={[
                styles.elementLabel,
                activeElement === element.slug && styles.elementLabelActive,
              ]}
            >
              {element.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchInput: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1a1a1a',
  },
  list: {
    flex: 1,
  },
  elementRow: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    backgroundColor: '#fff',
  },
  elementRowActive: {
    backgroundColor: '#f0faf5',
    borderLeftWidth: 4,
    borderLeftColor: '#1a6b4a',
  },
  elementLabel: {
    fontSize: 17,
    color: '#1a1a1a',
  },
  elementLabelActive: {
    color: '#1a6b4a',
    fontWeight: '600',
  },
})
