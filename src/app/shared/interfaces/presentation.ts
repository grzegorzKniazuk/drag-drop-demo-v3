import { Slide, Column } from 'src/app/shared/interfaces';

export interface IPresentation {
	id: number;
	title: string;
	thumbnail: string | ArrayBuffer;
	slides: Slide[];
	columns: Column[];
}

export type Presentation = Readonly<IPresentation>;
