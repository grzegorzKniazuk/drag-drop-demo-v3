import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/column/column-title/column-title.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-lightbox/slide-lightbox.component';
import { SlideSelectNewActionTypeComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/slide-select-new-action-type/slide-select-new-action-type.component';
import { InternalSlideLinkComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/internal-slide/internal-slide-link/internal-slide-link.component';
import { ExternalLinkComponent } from 'src/app/modules/dashboard/modules/presentation-creator/components/slide/slide-edit/components/external-link/external-link.component';
import { PresentationTitleComponent } from 'src/app/shared/components/presentation-title/presentation-title.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

export type DynamicComponentTypes =
	ColumnTitleComponent
	| SlideLightboxComponent
	| SlideSelectNewActionTypeComponent
	| InternalSlideLinkComponent
	| ExternalLinkComponent
	| PresentationTitleComponent
	| ConfirmDialogComponent;
