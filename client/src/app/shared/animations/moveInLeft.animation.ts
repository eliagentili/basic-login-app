import {
  trigger,
  state,
  animate,
  style,
  transition,
  AnimationTriggerMetadata,
} from '@angular/animations';

export function moveInLeft(): AnimationTriggerMetadata {
  return trigger('moveInLeft', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(-100px)' }),
      animate(
        '.6s .2s ease-in-out',
        style({ opacity: '1', transform: 'translateX(0)' })
      ),
    ]),
  ]);
}
