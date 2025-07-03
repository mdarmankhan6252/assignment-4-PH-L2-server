interface IBook {
   title: string;
   author: string;
   genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
   isbn: string;
   copies: number;
   description: string;
   availability: boolean;
   checkAvailability(): void
}