import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksAdminComponent } from './Admin/books-admin/books-admin.component';
import { BooksAudioAdminComponent } from './Admin/books-audio-admin/books-audio-admin.component';
import { ProfileAdminComponent } from './Admin/profile-admin/profile-admin.component';
import { PublicationsAdminComponent } from './Admin/publications-admin/publications-admin.component';
import { SingleBookAdminComponent } from './Admin/single-book-admin/single-book-admin.component';
import { UsersAdminComponent } from './Admin/users-admin/users-admin.component';
import { HomeComponent } from './Auth/home/home.component';
import { LivresAudioComponent } from './Auth/livres-audio/livres-audio.component';
import { LivrespdfComponent } from './Auth/livrespdf/livrespdf.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ShowBookComponent } from './Auth/show-book/show-book.component';
import { AddPostComponent } from './Client/add-post/add-post.component';
import { ClientProfileComponent } from './Client/client-profile/client-profile.component';
import { OtherPostsComponent } from './Client/other-posts/other-posts.component';
import { PostsClientComponent } from './Client/posts-client/posts-client.component';


const routes: Routes = [
  {
  path : '' , redirectTo: '/home', pathMatch: 'full'
  },
  {
    path : 'home' , component : HomeComponent,

  },
  {
    path : 'register' , component : RegisterComponent,
    
  },
  {
    path : 'livres/audio' , component : LivresAudioComponent,
    
  },
  
  {
    path : 'livres/pdf' , component : LivrespdfComponent,
    
  },
  {
    path : 'livre/:id' , component : ShowBookComponent,
    
  },
  {
    path : 'login' , component : LoginComponent,
    
   },
  {
   path : 'admin' , children : [
    {
       path : 'profile' , component : ProfileAdminComponent
    },
      {
       path : 'books/pdf' , component : BooksAdminComponent
      },
      {
       path : 'books/audio' , component : BooksAudioAdminComponent
      }
      ,
      {
       path : 'posts' , component : PublicationsAdminComponent
      }
      ,
      {
       path : 'book/:id' , component : SingleBookAdminComponent
      }
      ,
      {
       path : 'users' , component : UsersAdminComponent
      }
    ]  
  },
   {
    path : 'client' , children : [
      {
       path : 'profile' , component : ClientProfileComponent
      },
      {
        path : 'post/add' , component : AddPostComponent
       },
      {
        path : 'posts' , component : PostsClientComponent
     },
      
       {
         path : 'posts/all' , component : OtherPostsComponent
      }
    ]  
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
