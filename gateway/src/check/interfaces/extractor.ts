export interface Extractor {
    extract(html: string): { articleText?: string };
}