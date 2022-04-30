import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './game/components/canvas/canvas.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EditorSideNavComponent } from './game/components/editor-side-nav/editor-side-nav.component';
import { GameComponent } from './game/components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    LoginComponent,
    UserPageComponent,
    GameComponent,
    EditorSideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
