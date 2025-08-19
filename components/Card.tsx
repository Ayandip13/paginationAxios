import { View, Text } from 'react-native'
import React from 'react'

interface CardProps {
    id: number,
    title: string,
    body: string
}

const Card = ({ id, title, body }: CardProps) => {
    return (
        <View
            style={{
                marginVertical: 10,
                marginHorizontal: 20,
                backgroundColor: '#BBDCE5',
                paddingVertical: 10,
                paddingHorizontal: 25,
                elevation: 5,
                borderRadius: 10,
            }}>
            <View style={{ flexDirection: 'row' }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>{title}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{id}</Text>
            </View>
            <View
                style={{
                    height: 1,
                    backgroundColor: 'black',
                    flex: 1,
                    marginVertical: 10
                }} />

            <Text
                style={{
                    fontSize: 16
                }}>{body}</Text>
        </View>
    )
}

export default Card