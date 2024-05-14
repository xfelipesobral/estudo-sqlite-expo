import { SQLiteBindValue } from 'expo-sqlite'
import { conexao } from './db'

export async function executarSql(query: string, valores: SQLiteBindValue[] = [], array: boolean = false) {
    try {
        if (!query) throw new Error('Informe a query SQL')

        const db = await conexao()

        if (query.substring(0, 6).toUpperCase() !== 'SELECT') {
            console.log('Executando:', query, valores)
            return await db.runAsync(query, valores)
        }

        if (array) {
            console.log('Buscando todos registros:', query, valores)
            return await db.getAllAsync(query, valores)
        }

        console.log('Buscando primeiro registro:', query, valores)
        return await db.getFirstAsync(query, valores)
    } catch (error) {
        console.log('Erro ao executar SQL:', error)
    }
}