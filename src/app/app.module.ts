import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { HomeComponent } from './Auth/home/home.component';
// import { ProfileFormateurComponent } from './Formateur/profile-formateur/profile-formateur.component';
// import { HomeFormateurComponent } from './Formateur/home-formateur/home-formateur.component';
// import { CoursesFormateurComponent } from './Formateur/courses-formateur/courses-formateur.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { MatToolbarModule , MatSidenavModule , MatButtonModule , MatIconModule , MatDividerModule} from '@angular/material';


import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ProfileEtudiantComponent } from './Etudiant/profile-etudiant/profile-etudiant.component';
// import { HomeEtudiantComponent } from './Etudiant/home-etudiant/home-etudiant.component';
// import { CourseEtudiantComponent } from './Etudiant/course-etudiant/course-etudiant.component';
// import { ShowCourseComponent } from './Etudiant/show-course/show-course.component';
// import { OrdersComponent } from './Formateur/orders/orders.component';
 import { BooksAdminComponent } from './Admin/books-admin/books-admin.component';
import { ProfileAdminComponent } from './Admin/profile-admin/profile-admin.component';
import { ClientProfileComponent } from './Client/client-profile/client-profile.component';
import { LivresAudioComponent } from './Auth/livres-audio/livres-audio.component';
import { LivrespdfComponent } from './Auth/livrespdf/livrespdf.component';
import { BooksAudioAdminComponent } from './Admin/books-audio-admin/books-audio-admin.component';
import { PublicationsAdminComponent } from './Admin/publications-admin/publications-admin.component';
import { UsersAdminComponent } from './Admin/users-admin/users-admin.component';
import { SingleBookAdminComponent } from './Admin/single-book-admin/single-book-admin.component';
import { AddPostComponent } from './Client/add-post/add-post.component';
import { PostsClientComponent } from './Client/posts-client/posts-client.component';
import { OtherPostsComponent } from './Client/other-posts/other-posts.component';
import { ShowBookComponent } from './Auth/show-book/show-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BooksAdminComponent,
    ProfileAdminComponent,
    ClientProfileComponent,
    LivresAudioComponent,
    LivrespdfComponent,
    BooksAudioAdminComponent,
    PublicationsAdminComponent,
    UsersAdminComponent,
    SingleBookAdminComponent,
    AddPostComponent,
    PostsClientComponent,
    OtherPostsComponent,
    ShowBookComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
