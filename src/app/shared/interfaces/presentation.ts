import { Slide } from 'src/app/shared/interfaces/slide';
import { Column } from 'src/app/shared/interfaces/column';

export interface IPresentation {
	id: number;
	title: string;
	thumbnail: string | ArrayBuffer;
	slides: Slide[];
	columns: Column[];
}

export type Presentation = Readonly<IPresentation>;
