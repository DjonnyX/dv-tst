import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document.component';

const routes: Routes = [
  { path: '', component: DocumentComponent },
  {
    path: ':documentId',
    loadChildren: () => import('@pages/document-viewer/document-viewer.module').then(m => m.DocumentViewerModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
