import { Slide } from 'src/app/shared/interfaces/slide';
import { Column } from 'src/app/shared/interfaces/column';

export interface Presentation {
	id: number;
	title: string;
	thumbnail: string | ArrayBuffer;
	slides: Slide[];
	columns: Column[];
}
