import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { reorg } from '@/functions/db/reorg'
import Botao from '@/components/botao'
import { Postagem, buscarPostagensBanco, limparPostagensBanco, popularBanco } from '@/functions/dados/postagens'
import { useEffect, useState } from 'react'
import { deletaDb } from '@/functions/db/db'

reorg()

export default function App() {
    const [postagens, setPostagens] = useState<Postagem[]>([])

    useEffect(() => {
        buscarBanco()
    }, [])

    const buscarBanco = () => {
        buscarPostagensBanco().then(setPostagens)
    }

    const popularBancoPouco = async () => {
        await popularBanco(false)
        buscarBanco()
    }

    const popularBancoMuito = async () => {
        await popularBanco(true)
        buscarBanco()
    }

    const limparBanco = async () => {
        await limparPostagensBanco()
        buscarBanco()
    }

    return (
        <View className='bg-white flex-1'>
            <SafeAreaView className='flex-1'>
                <View className='px-5 flex-row items-center py-3 border-b border-gray-100' style={{ gap: 10 }}>
                    <View className='bg-orange-500 rounded-md p-1'>
                        <MaterialCommunityIcons name="database" size={32} color='white' />
                    </View>
                    <Text className='font-bold' style={{ fontSize: 16 }}>Teste SQLite</Text>
                </View>
                <ScrollView className='bg-gray-100' contentContainerStyle={{ padding: 20, gap: 20 }}>
                    <View style={{ gap: 5 }}>
                        <Text className='font-bold'>Banco</Text>
                        <View style={{ gap: 10 }}>
                            <Botao texto='Deletar banco de dados' acao={deletaDb} />
                            <Botao texto='Reorg' acao={reorg} />
                        </View>
                    </View>

                    <View style={{ gap: 5 }}>
                        <Text className='font-bold'>Dados</Text>
                        <View style={{ gap: 10 }}>
                            <Botao texto='Buscar' acao={buscarBanco} />
                            <Botao texto='Popular com pouco volume' acao={popularBancoPouco} />
                            <Botao texto='Popular com bastante volume' acao={popularBancoMuito} />
                            <Botao texto='Remover tudo' acao={limparBanco} />
                        </View>
                    </View>

                    <View style={{ gap: 5 }}>
                        <Text className='font-bold'>Postagens</Text>
                        <View style={{ gap: 10 }}>
                            {postagens.map((postagem) => (
                                <View key={postagem.id} className='bg-white flex-row p-3 rounded-md border border-gray-200' style={{ gap: 12 }}>
                                    <View>
                                        <Image className='h-12 w-12 rounded-md' source={{ uri: postagem.image_url }} />
                                    </View>
                                    <View className='flex-1'>
                                        <Text className='font-bold'>{postagem.title}</Text>
                                        {postagem.summary && <Text>{postagem.summary}</Text>}
                                        <Text className='mt-1' style={{ fontSize: 11 }}>{postagem.published_at}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}