import axios from 'axios'
import { executarSql } from '../db/sql'

export interface Postagem {
    id: number
    title: string
    url: string
    image_url: string
    news_site: string
    summary: string
    published_at: string
    updated_at: string
    featured: boolean
}

interface Response {
    count: number
    next: string
    previous: string | null
    results: Postagem[]
}

export async function buscarPostagens(itens: number = 10) {
    try {
        const { data: { results } } = await axios.get<Response>(`https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=${itens}`)

        return results
    } catch {
        return []
    }
}

export function limparPostagensBanco() {
    return executarSql(`DELETE FROM [publicacao]`)
}

export async function popularBanco(grandeVolume: boolean = false) {
    console.log('Buscando postagens...')
    const postagens = await buscarPostagens(grandeVolume ? 1000 : 10)

    console.log('Encontrado: ', postagens.length)

    console.log('Limpando banco...')
    await limparPostagensBanco()

    // Inserir no banco
    for (const { id, featured, image_url, news_site, published_at, summary, title, updated_at, url } of postagens) {
        await executarSql(`
            INSERT INTO [publicacao] 
            ([id],[title],[url],[image_url],[news_site],[summary],[published_at],[updated_at],[featured])
            VALUES
            (?,?,?,?,?,?,?,?,?);`,
            [id, title, url, image_url, news_site, summary, published_at, updated_at, featured ? 1 : 0]
        )
    }
}

export async function buscarPostagensBanco() {
    const postagens = await executarSql(`SELECT * FROM [publicacao] ORDER BY id`, [], true) as Postagem[] || []
    return postagens
}