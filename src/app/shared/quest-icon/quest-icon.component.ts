import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { QuestStatus } from 'src/app/character';
import { IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-quest-icon',
  templateUrl: './quest-icon.component.html',
  styleUrls: ['./quest-icon.component.scss'],
})
export class QuestIconComponent implements AfterViewChecked {
  @Input() quest: QuestStatus;
  @ViewChild(IonIcon, { read: ElementRef }) icon: ElementRef<HTMLElement>;

  ngAfterViewChecked(): void {
    // The property ariaLabel doesn't properly set the tooltip text, so we need to open the Shadow DOM of the icon.
    // Because the SVG is lazy-loaded, this must be repeatedly checked and reset.
    // See https://github.com/ionic-team/ionicons/issues/838.
    const root = this.icon.nativeElement.shadowRoot;
    if (root.childElementCount) {
      const title = root.querySelector('title');
      if (title) {
        title.innerHTML = this.text;
      }
    }
  }

  public get iconName(): string {
    switch (this.quest.status) {
      case 'in-progress':
        return 'alert-circle';
      case 'complete':
        return 'checkmark-circle';
      case 'not-started':
        return '';
      case 'unknown':
        return 'help';
    }
  }

  public get color(): string {
    switch (this.quest.status) {
      case 'in-progress':
        return 'warning';
      case 'complete':
        return 'success';
      case 'not-started':
        return '';
      case 'unknown':
        return '';
    }
  }

  public get text(): string {
    if (this.quest.text) {
      return this.quest.text;
    }

    switch (this.quest.status) {
      case 'in-progress':
        return 'In Progress';
      case 'complete':
        return 'Complete';
      case 'not-started':
        return '';
      case 'unknown':
        return 'Refresh to load data';
    }
  }
}
