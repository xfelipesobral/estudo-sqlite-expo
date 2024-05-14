import { executarSql } from './sql'

const querys = [
    'CREATE TABLE IF NOT EXISTS [publicacao] ([id] INT,[title] TEXT,[url] TEXT,[image_url] TEXT,[news_site] TEXT,[summary] TEXT,[published_at] TEXT,[updated_at] TEXT,[featured] INT)'
]

export async function reorg() {
    for (const linha of querys) {
        await executarSql(linha)
    }

    console.log('Reorg executado')
}