declare module 'pdfjs-dist/build/pdf' {
  export const GlobalWorkerOptions: any;
  export function getDocument(source: any): any;
  export function getPage(pageNumber: number): any;
  // Add more exports as needed based on your usage
}
