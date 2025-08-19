import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  StatusBar,
  useWindowDimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import axios from 'axios'

const App = () => {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { width, height } = useWindowDimensions()

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      setPage(1)
      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5`
      )
      setData(resp.data)
    } catch (error: string | null) {
      setError(error.message)
    } finally {
      setRefreshing(false)
    }
  }

  const fetchData = async (pageNum: number) => {
    try {
      setLoading(true)
      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=5`
      )
      setData(prev => [...prev, ...resp.data])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const loadMore = () => {
    if (!loading) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingVertical: height * 0.03 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEEEEE" />
      {
        error ? (
          <Text
            style={{
              fontSize: width * 0.05,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#468A9A'
            }}
          >
            {error}
          </Text>
        ) : (
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            ListHeaderComponent={() => (
              <View style={{ alignItems: 'center', backgroundColor: '#EEEEEE' }}>
                <Text
                  style={{
                    fontSize: width * 0.06,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#1C6EA4',
                    paddingVertical: height * 0.025
                  }}
                >
                  Fetched Items
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <Card id={item.id} title={item.title} body={item.body} />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              loading ? <ActivityIndicator size="large" color="#1C6EA4" /> : null
            }
          />
        )
      }
    </View>
  )
}

export default App
