export interface ExtractorContract {
    extract: (html: string) => {
        title: string;
        articleText: string;
    }
}