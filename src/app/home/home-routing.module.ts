import { FormularioComponent } from './formulario/formulario.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'formulario' },
    { path: 'formulario', component: FormularioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }