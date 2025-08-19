import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

interface CardProps {
  id: number,
  title: string,
  body: string
}

const Card = ({ id, title, body }: CardProps) => {
  const { width, height } = useWindowDimensions()

  return (
    <View
      style={{
        marginVertical: height * 0.012,   // ~1.2% of screen height
        marginHorizontal: width * 0.05,   // ~5% of screen width
        backgroundColor: '#BBDCE5',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.06,
        elevation: 5,
        borderRadius: width * 0.03,       // rounded corners scale with width
      }}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontSize: width * 0.045,       // responsive font size
            fontWeight: 'bold',
            flexShrink: 1                  // prevents text overflow
          }}
        >
          {title}
        </Text>
        <Text 
          style={{ 
            fontSize: width * 0.045, 
            fontWeight: 'bold' 
          }}
        >
          {id}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: 'black',
          flex: 1,
          marginVertical: height * 0.012
        }} 
      />

      <Text
        style={{
          fontSize: width * 0.04,          // slightly smaller than title
          fontWeight: 'bold'
        }}
      >
        {body}
      </Text>
    </View>
  )
}

export default Card
