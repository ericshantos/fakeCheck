export interface FileReaderContract {
  (path: string, options: { encoding: BufferEncoding }): Promise<string>;
}