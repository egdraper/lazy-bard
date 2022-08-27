import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './game/base-components/canvas/canvas.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EditorSideNavComponent } from './game/base-components/editor-side-nav/editor-side-nav.component';
import { GameComponent } from './game/base-components/game/game.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InteractionComponent } from './game/base-components/action-list-component/action-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    LoginComponent,
    UserPageComponent,
    GameComponent,
    EditorSideNavComponent,
    InteractionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
