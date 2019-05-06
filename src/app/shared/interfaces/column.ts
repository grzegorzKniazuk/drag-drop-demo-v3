export interface IColumn {
	id: number;
	position: number;
	title: string;
}

export type Column = Readonly<IColumn>;
