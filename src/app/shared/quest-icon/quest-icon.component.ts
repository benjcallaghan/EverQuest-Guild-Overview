import { Component, Input } from '@angular/core';
import { QuestStatus } from 'src/app/character';

@Component({
  selector: 'app-quest-icon',
  templateUrl: './quest-icon.component.html',
  styleUrls: ['./quest-icon.component.scss'],
})
export class QuestIconComponent {
  @Input() quest: QuestStatus;

  public get icon(): string {
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

  public get title(): string {
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
