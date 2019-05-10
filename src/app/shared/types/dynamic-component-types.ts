import { ColumnTitleComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/column/column-title/column-title.component';
import { SlideLightboxComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-lightbox/slide-lightbox.component';
import { PresentationTitleDialogComponent } from 'src/app/shared/components/presentation-title-dialog/presentation-title-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SlideSelectNewActionTypeComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/slide-select-new-action-type/slide-select-new-action-type.component';
import { InternalSlideLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/internal-slide/internal-slide-link/internal-slide-link.component';
import { ExternalLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/external-link/external-link.component';
import { ExternalPresentationLinkComponent } from 'src/app/modules/dashboard/modules/presentation-editor/components/slide/slide-edit/external-presentation/external-presentation-link/external-presentation-link.component';

export type DynamicComponentTypes =
	ColumnTitleComponent
	| SlideLightboxComponent
	| SlideSelectNewActionTypeComponent
	| InternalSlideLinkComponent
	| ExternalLinkComponent
	| PresentationTitleDialogComponent
	| ExternalPresentationLinkComponent
	| ConfirmDialogComponent;
