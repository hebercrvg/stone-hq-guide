import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import api from '../../configs/api';
import { useNavigation } from '@react-navigation/native';
import { Container, Form, Input, Button, ButtonText, ListContainer, CharacterAvatar, CharacterContainer, CharacterName } from './styles';

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
  urls: {
    type: 'detail' | 'wiki' | 'comiclink';
    url: string;
  }[]
}

const Home: React.FC = () => {
  const [characterName, setCharacterName] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  const getCharacters = useCallback(async () : Promise<void> => {
    try {
      setLoading(true);
      if (!characterName) {
        return Alert.alert('Ops...', 'Please, enter a character name.')
      }
      const response = await api.get('/characters', {
        params: {
          nameStartsWith: characterName
        }
      });
      setCharacters(response.data.data.results || []);
      setCharacterName("");
    }
    finally {
      setLoading(false);
    }
  }, [characterName, setCharacters, setCharacterName, setLoading]);

  return (
    <Container>
      <Form>
        <Input
          placeholder="Enter a character name"
          value={characterName} 
          onChangeText={text => setCharacterName(text)}/>
        <Button onPress={getCharacters}>
          {loading ? (
            <ActivityIndicator
            hidesWhenStopped={true}
            size={24} color="#333"/>
          ) : (
            <ButtonText>SEARCH</ButtonText>
          )}
        </Button>
      </Form>
      <ListContainer showsVerticalScrollIndicator={false}>
        {characters.map(character => (
          <CharacterContainer 
            key={character.id} 
            onPress={() => navigate('Character', { character })}>
              <CharacterAvatar 
              source={{uri: `${character.thumbnail.path}.${character.thumbnail.extension}`}} />
              <CharacterName numberOfLines={1}>{character.name}</CharacterName>
            </CharacterContainer>
          ))}
      </ListContainer>
    </Container>
  );
}

export default Home;