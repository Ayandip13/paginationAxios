import { View, FlatList, ActivityIndicator, RefreshControl, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import axios from 'axios'

const App = () => {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  const fetchData = async (pageNum: number) => {
    try {
      setLoading(true)
      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=5`
      )
      setData(prev => [...prev, ...resp.data])
    } catch (error: string | null) {
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
    <View style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 30 }}>
      {
        error ?
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#468A9A' }}>{error}</Text>
          : (
            <FlatList
              data={data}
              ListHeaderComponent={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: '#EEEEEE'
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: '#1C6EA4',
                      paddingVertical: 20
                    }}>Fetched Items</Text>
                </View>
              )}
              renderItem={({ item }) => <Card id={item.id} title={item.title} body={item.body} />}
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
