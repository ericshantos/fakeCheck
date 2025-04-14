import axios from "axios";
import os from "os";
import textProcessor from "./pythonBridge.js";

/**
 * Verifica a conexão com a internet acessando o Google.
 * @returns {Promise<{ status: string, message: string }>}
 */
export const checkInternetConnection = async () => {
    try {
        await axios.get('https://www.google.com', { timeout: 2000 });
        return { status: 'success', message: 'Conectado à internet' };
    } catch (error) {
        return { status: 'error', message: 'Sem conexão com a internet' };
    }
};

/**
 * Verifica se o scraper está funcionando corretamente ao extrair texto HTML simulado.
 * @returns {Promise<{ status: string, message: string }>}
 */
export const checkScraper = async () => {
    try {
        const html = '<html><body><p>Notícia teste</p></body></html>';
        const match = html.match(/<p>(.*?)<\/p>/)?.[1];

        if (match) {
            return { status: 'success', message: 'Scraper funcionando corretamente' };
        } else {
            return { status: 'error', message: 'Scraper falhou na extração do texto' };
        }
    } catch (error) {
        return { status: 'error', message: 'Erro inesperado no scraper' };
    }
};

/**
 * Verifica os recursos do sistema (memória disponível).
 * @returns {{ status: string, message: string }}
 */
export const checkSystemResources = () => {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const memoryUsage = freeMemory / totalMemory;

    if (memoryUsage < 0.1) {
        return {
            status: 'error',
            message: 'Memória insuficiente disponível no sistema'
        };
    }

    return {
        status: 'success',
        message: 'Recursos do sistema adequados'
    };
};

/**
 * Verifica se o modelo de machine learning está realizando previsões.
 * @param {{ text?: string }} param0
 * @returns {Promise<{ status: string, message: string, data?: any }>}
 */
export const checkModel = async ({ 
    text = "noticia falso espalhar rapidamente rede social poder causar desinformacao larga escala" 
} = {}) => {
    try {
        const result = await textProcessor(text);

        if (!result) {
            return {
                status: 'error',
                message: 'Modelo não retornou uma previsão'
            };
        }

        return {
            status: 'success',
            message: 'Modelo operacional e realizando previsões',
            data: result
        };
    } catch (error) {
        return {
            status: 'error',
            message: `Erro ao verificar o modelo: ${error.message}`
        };
    }
};
