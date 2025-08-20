import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from './components/Card'
import axios from 'axios'

const App = () => {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<any[]>([])   // For Listing 1
  const [data2, setData2] = useState<any[]>([]) // For Listing 2
  const [loading, setLoading] = useState<boolean>(false)
  const [loading2, setLoading2] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)
  const [error2, setError2] = useState<null | string>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { width, height } = useWindowDimensions()
  const [open, setOpen] = useState<1 | 2>(1) // <-- 1 = Listing1, 2 = Listing2

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      setPage(1)
      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5`
      )
      setData(resp.data)
    } catch (error: any) {
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

  // Fetch Listing 2 (Crypto coins)
  const fetchData2 = async (pageNum: number) => {
    try {
      setLoading2(true)
      const resp = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=5&page=${pageNum}`
      )
      setData2(prev => [...prev, ...resp.data])
    } catch (error: any) {
      setError2(error.message)
    } finally {
      setLoading2(false)
    }
  }

  useEffect(() => {
    fetchData(page)
    fetchData2(page)
  }, [page])

  const loadMore = () => {
    if (!loading && !loading2) {
      setPage(prev => prev + 1)
    }
  }

  const selectedData = open === 1 ? data : data2
  const selectedError = open === 1 ? error : error2
  const selectedLoading = open === 1 ? loading : loading2

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingVertical: height * 0.03 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEEEEE" />
      {
        selectedError ? (
          <Text
            style={{
              fontSize: width * 0.05,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#468A9A'
            }}
          >
            {selectedError}
          </Text>
        ) : (
          <FlatList
            data={selectedData}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            ListHeaderComponent={() => (
              <View>
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
                    {open === 1 ? 'Fetched Posts' : 'Crypto Coins'}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    paddingVertical: height * 0.01
                  }}>
                  <Text 
                    onPress={() => setOpen(1)} 
                    style={{ 
                      fontWeight: 'bold', 
                      fontSize: width * 0.05,
                      color: open === 1 ? '#7A7A73' : 'black'
                    }}
                  >
                    Listing 1
                  </Text>
                  <Text 
                    onPress={() => setOpen(2)} 
                    style={{ 
                      fontWeight: 'bold', 
                      fontSize: width * 0.05,
                      color: open === 2 ? '#7A7A73' : 'black'
                    }}
                  >
                    Listing 2
                  </Text>
                </View>
              </View>
            )}
            renderItem={({ item }) => (
              <Card 
                id={item.id || item.market_cap_rank} 
                title={item.title || item.name} 
                body={item.body || `Price: $${item.current_price}`} 
              />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
              selectedLoading ? <ActivityIndicator size="large" color="#1C6EA4" /> : null
            }
          />
        )
      }
    </View>
  )
}

export default App
