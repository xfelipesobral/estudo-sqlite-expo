import * as FileSystem from 'expo-file-system'

export async function deletaArquivo(nomeArquivo: string) {
    const j = await FileSystem.getInfoAsync(nomeArquivo)
	if (j.exists) await FileSystem.deleteAsync(nomeArquivo)
}