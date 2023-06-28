import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RAPID_API_KEY} from '@env';
import axios from 'axios';

const rapidApiKey = RAPID_API_KEY;
const useFetch = (endpoint, query) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '93f818508bmsh2f5b42419347cfep129bdcjsn210fa5c51862',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: {...query},
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return {loading, error, data, refetch};
};

export default useFetch;
