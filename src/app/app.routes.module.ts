import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren:"./web/main/main.module#MainModule"
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}