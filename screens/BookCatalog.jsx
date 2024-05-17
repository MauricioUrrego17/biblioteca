import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, Searchbar, Title } from 'react-native-paper';
import FirebaseContext from '../context/firebase/firebaseContext';
import PrestamoContext from '../context/prestamos/prestamosContext';

const BooksCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { librosCatalogo, obtenerLibros } = useContext(FirebaseContext); // Utiliza el contexto de Firebase para obtener los datos
  const { seleccionarLibro } = useContext(PrestamoContext);
  const navigation = useNavigation();

  useEffect(() => {
    obtenerLibros();
  }, []);

  const filteredCars = librosCatalogo.filter((libro) =>
    libro.nombre.toLowerCase().includes(searchQuery && searchQuery.toLowerCase()) ||
    libro.autor.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Searchbar
          placeholder="Buscar Libro"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {filteredCars.map((libro, index) => (
          <React.Fragment key={libro.id}>
            <Card key={libro.id} mode="outlined" style={styles.card}>
              <Card.Content>
                <Text variant="titleLarge">{libro.nombre}</Text>
                <Text variant="bodyMedium">Autor: {libro.autor}</Text>
              </Card.Content>
              <Card.Cover source={{ uri: libro.imagen }} style={styles.cardImage} />
              <Card.Actions>
                <Button
                  mode="elevated"
                  buttonColor="#411f2d"
                  textColor="white"
                  onPress={() => {
                    seleccionarLibro(libro);
                    navigation.navigate('BookDetail');
                  }}
                >
                  Más información
                </Button>
              </Card.Actions>
            </Card>
          </React.Fragment>
        ))}
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained-tonal"
            buttonColor='#ffe29a'
            textColor='white'
            style={styles.button}
            onPress={() => {
              navigation.navigate('BorrowedBook');
            }}
          >
            <Text>Libros Prestados</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 10,
    backgroundColor: '#fff',
    color: '#411f2d'
  },
  card: {
    margin: 10,
  },
  cardImage: {
    margin: 10,
  },
  button: {
    margin: 5,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#ffe29a',
    elevation: 2,
    width: 250,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default BooksCatalog;
