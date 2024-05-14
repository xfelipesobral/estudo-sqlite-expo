import { TouchableOpacity, Text } from 'react-native'

interface Parametros {
    texto: string
    acao: () => void
}

export default function Botao({ texto, acao }: Parametros) {
    return (
        <TouchableOpacity onPress={acao} className='bg-white border rounded-md p-5 border-gray-300'>
            <Text>{texto}</Text>
        </TouchableOpacity>
    )
}