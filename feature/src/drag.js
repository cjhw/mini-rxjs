import {
  fromEvent,
  withLatestFrom,
  takeUntil,
  switchMap,
  throttleTime,
  debounceTime,
} from 'rxjs'

const draggableELement = document.getElementById('draggable')
const mouseDown$ = fromEvent(draggableELement, 'mousedown')
const mouseMove$ = fromEvent(draggableELement, 'mousemove').pipe(
  throttleTime(30)
)
const mouseUp$ = fromEvent(draggableELement, 'mouseup')

mouseDown$
  .pipe(
    switchMap(() =>
      mouseMove$.pipe(takeUntil(mouseUp$.pipe(debounceTime(500))))
    ),
    withLatestFrom(mouseDown$, (moveEvent, downEvent) => {
      return {
        left: moveEvent.clientX - downEvent.offsetX,
        top: moveEvent.clientY - downEvent.offsetY,
      }
    })
  )
  .subscribe(({ left, top }) => {
    draggableELement.style.left = left + 'px'
    draggableELement.style.top = top + 'px'
  })
