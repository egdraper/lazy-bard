import { Component, OnInit } from '@angular/core';
import { AddOnBase } from '../../extensions/addon-base';
import { GSM } from '../../game-state-manager.service';

@Component({
  selector: 'gm-editor-side-nav',
  templateUrl: './editor-side-nav.component.html',
  styleUrls: ['./editor-side-nav.component.scss']
})
export class EditorSideNavComponent implements OnInit {
  public layers: AddOnBase[] = []

  constructor() { }

  ngOnInit(): void {
    this.layers = GSM.AddonController.addOns
  }

}
