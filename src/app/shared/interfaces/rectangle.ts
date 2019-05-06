import { Coordinates } from 'src/app/shared/interfaces/coordinates';

export interface Rectangle {
	topLeft: Coordinates;
	topRight: Coordinates;
	bottomLeft: Coordinates;
	bottomRight: Coordinates;
}
