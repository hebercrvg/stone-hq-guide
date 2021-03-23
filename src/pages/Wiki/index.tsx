import React, { useCallback, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Container } from './styles';

interface RouteParams {
  url: string;
  name: string;
}

const Wiki: React.FC = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { params } = useRoute();
  const { setOptions } = useNavigation();

  useEffect(() => {
    const routeParams = params as RouteParams;
    setUrl(routeParams.url);
    setOptions({
      title: `Wiki - ${routeParams.name}`
    });
  }, [params, setUrl]);

  const handle = useCallback(() => {
    console.log('caiu');
    setLoading(false);
  }, []);

  return (
    <WebView source={{uri: url}} />
  );
}

export default Wiki;