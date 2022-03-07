import { Component, OnInit } from '@angular/core';
import { LayerAddOn } from '../../extensions/layer-extension';
import { GSM } from '../../game-state-manager.service';

@Component({
  selector: 'gm-editor-side-nav',
  templateUrl: './editor-side-nav.component.html',
  styleUrls: ['./editor-side-nav.component.scss']
})
export class EditorSideNavComponent implements OnInit {
  public layers: LayerAddOn[] = []

  constructor() { }

  ngOnInit(): void {
    this.layers = GSM.LayerController.layerAddOns
  }

}
