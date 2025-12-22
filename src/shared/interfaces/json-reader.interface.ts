export interface JsonReaderContract {
    read<T>(path: string): Promise<T>;
}