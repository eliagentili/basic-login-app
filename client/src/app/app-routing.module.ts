import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './_components/login/login.component';

// import { HomeComponent } from './_components/home/home.component';
// import { AuthGuard } from './_guards/auth.guard';

// const usersModule = () =>
//   import('../app/_modules/users/users.module').then((x) => x.UsersModule);

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren:
          './features-modules/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'posts',
        loadChildren: './features-modules/posts/posts.module#PostsModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
