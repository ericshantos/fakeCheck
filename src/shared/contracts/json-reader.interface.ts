export interface JsonReaderContract {
    read<T = any>(file: string): Promise<T>;
};