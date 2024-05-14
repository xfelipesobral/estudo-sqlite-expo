import { openDatabaseAsync } from 'expo-sqlite'
import { documentDirectory } from 'expo-file-system'
import { deletaArquivo } from './deletaArquivo'

export function conexao() {
    console.log('Abrindo conexão com o banco de dados...')
    return openDatabaseAsync('data.db')
}

export async function deletaDb() {
    console.log('Iniciando a exclusão do banco de dados...')
    const db = await conexao()

    console.log('Fechando conexão...')
    db.closeSync()

    console.log('Excluindo arquivos...')
    await deletaArquivo(`${documentDirectory}SQLite/data.db-journal`)
    await deletaArquivo(`${documentDirectory}SQLite/data.db`)
    console.log('Banco de dados excluído!')
}