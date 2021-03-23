import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Character as CharacterObject } from '../Home';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Container, CharacterAvatar, CharacterName, CharacterBio, WikiButton, WikiButtonText } from './styles';
import { Platform } from 'react-native'

interface RouteParams {
  character: CharacterObject;
}

const Character: React.FC = () => {
  const [character, setCharacter] = useState<CharacterObject>();
  const { params } = useRoute();
  const { setOptions, navigate } = useNavigation();

  useEffect(() => {
    const routeParams = params as RouteParams;

    setCharacter(routeParams.character);
    setOptions({title: routeParams.character.name});
  }, [params, setCharacter, setOptions]);

  const handleNavigateWiki = useCallback(() => {
    const wikiUrl = character?.urls.find(x => x.type === 'wiki')?.url;
    
    if (Platform.OS === 'web') {
      return window.open(wikiUrl);
    }

    navigate('Wiki', { 
      url: wikiUrl,
      name: character?.name
    });
  }, [character]);

  return (
    <Container>
      <CharacterAvatar source={{uri: `${character?.thumbnail.path}.${character?.thumbnail.extension}`}}/>
      <CharacterName>{character?.name}</CharacterName>
      <CharacterBio>{character?.description || "No bio available."}</CharacterBio>
      <WikiButton onPress={handleNavigateWiki}>
        <WikiButtonText>OPEN WIKI</WikiButtonText>
      </WikiButton>
    </Container>
  );
}

export default Character;