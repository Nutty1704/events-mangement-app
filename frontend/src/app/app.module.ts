import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddEventComponent } from './components/abhi/add-event/add-event.component';
import { ListEventComponent } from './components/abhi/list-event/list-event.component';
import { DeleteEventComponent } from './components/abhi/delete-event/delete-event.component';
import { DatabaseService } from './services/database.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
// import { DisplayEventComponent } from './components/abhi/display-event/display-event.component';
import { UpdateEventComponent } from './components/abhi/update-event/update-event.component';
import { FooterComponent } from './components/footer/footer.component';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { EndDateTimeCalcPipe } from './pipes/end-date-time-calc.pipe';
import { DateToStringPipe } from './pipes/date-to-string.pipe';
import { StatsG2Component } from './components/abhi/stats-g2/stats-g2.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateComponent } from './components/abhi/translate/translate.component';
import { AddCategoryComponent } from './components/silin/add-category/add-category.component';
import { ListCategoriesComponent } from './components/silin/list-categories/list-categories.component';
import { DeleteCategoryComponent } from './components/silin/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './components/silin/update-category/update-category.component';
import { UpperCasePipe } from './pipes/upper-case.pipe';
import { TextToSpeechComponent } from './components/silin/text-to-speech/text-to-speech.component';
import { DisplayCategoryComponent } from './components/silin/display-category/display-category.component';
import { StatsG1Component } from './components/silin/stats-g1/stats-g1.component';


const routes: Routes = [
  { path: 'add-event', component: AddEventComponent },
  { path: 'list-events', component: ListEventComponent },
  { path: 'delete-event', component: DeleteEventComponent},
  // { path: 'display-event/:id', component: DisplayEventComponent},
  { path: 'update-event', component: UpdateEventComponent },
  { path: 'translate', component: TranslateComponent},
  { path: 'stats-g2', component: StatsG2Component },
  { path: 'invalid-data', component: InvalidDataComponent},
  // Paths for student 1
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'list-categories', component: ListCategoriesComponent },
  { path: 'delete-category',component:DeleteCategoryComponent},
  { path: 'update-category', component: UpdateCategoryComponent},
  { path: 'text-to-speech', component:TextToSpeechComponent},
  { path: 'display-category/:id',component:DisplayCategoryComponent},
  { path: 'stats-g1', component: StatsG1Component },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    ListEventComponent,
    DeleteEventComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    // DisplayEventComponent,
    UpdateEventComponent,
    FooterComponent,
    DurationFormatPipe,
    EndDateTimeCalcPipe,
    DateToStringPipe,
    StatsG2Component,
    InvalidDataComponent,
    TranslateComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    DeleteCategoryComponent,
    UpdateCategoryComponent,
    UpperCasePipe,
    TextToSpeechComponent,
    DisplayCategoryComponent,
    StatsG1Component
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(routes, {useHash: true}), HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
