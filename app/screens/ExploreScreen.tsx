import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { api } from '../services/api';

type System = {
  id: number;
  name: string;
  starMass: number;
};

export default function ExploreScreen() {
  const [systems, setSystems] = useState<System[]>([]);

  useEffect(() => {
    api.get('/planet_systems')
      .then(res => {
        console.log('✅ Données API reçues :', res.data);
        if (res.data['hydra:member']) {
          setSystems(res.data['member']);
        } else {
          console.warn('⚠️ Aucun champ hydra:member trouvé dans la réponse.');
        }
      })
      .catch(err => {
        console.error('❌ Erreur API :', err.message);
      });
  }, []);

  console.log('💡 Systèmes à afficher :', systems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Systèmes planétaires</Text>
      <FlatList
        data={systems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            • {item.name} (☀ {item.starMass} M☉)
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 20, color: '#fff', marginBottom: 10 },
  item: { fontSize: 16, color: '#ccc', marginVertical: 4 },
});
