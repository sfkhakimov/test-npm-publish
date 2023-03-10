# Библиотека которая позволяет создавать интерактивные инструкции

## Как использовать

Для начала нужно обернуть приложение провайдером `TourProvider`. 
В качестве пропсов ему обязательно нужно передать `steps` - шаги инструкции и `ContentComponent` - 
компонент который будет отображаться рядом с подсвечиваемой областью.

### Особенности


- Опционально можно передать другие пропсы которые определены в `ProviderProps`


- Инструкцию можно синхронизировать с `localStorage`. Для этого нужно пропс `localStorageKey` в виде
объекта. Который должен содержать `key` ключ по которому будет сохраняться инструкция в `localStorage`.
Для удобства можно передать и свои свойства кроме `key` если их потребуется использовать в вашем приложении. 
Инструкция не будет их изменять.


- Можно передать функцию `onChangeStep` которая будет делать что-то при переходе на шаг (например сохранять 
состояние инструкции на бэке). Ее можно передать как в пропсы провайдера так и определить 
в каждом шаге. Функция в шаге имеет приоритет перед переданной в провайдер

- Функции `beforeStart` и `beforeStop` будут выполняться перед стартом и остановкой инструкции


###  Как устроена внутри

- Инструкция использует 2 контекста:
 1. В первом определена вся инструкция (статус, все шаги, активный / предыдущий / следующий шаг и т.д).
Данные доступны с помощью хука `useTour`.
 2. Дает мемоизированные хелперы которые позволяют изменять инструкцию в любом месте приложения 
(updateSteps, onNextStep, onBackStep, onStart и т.д). Доступны по хуку `useTourHelpers`

- Инструкция имеет следующие состояния:
1. `Idle` - начальное состояние
2. `Waiting` - в это состояние инструкция переходит сразу после запуска (вызова функции `onStart`). Далее она может перейти в
состояние `Active` если удалось найти элемент на странице, иначе в `Stopped`. В состоянии `Waiting` 
инструкция может оказаться если при переходе между шагами уже запущенной инструкции она не смогла 
найти шаг. В таком случае если шаг будет найдет то снова перейдет в `Active` иначе в `Paused`
3. `Active` - в этот статус инструкция переходит когда запущена
4. `Paused` - если инструкция не находит шаг по селектору (кроме первого), то переходит в этот статус.
5. `Stopped` - переходит при срабатывании функции `onStop` и в случае если не был найден 1-й шаг инструкции.
6. `Skipped` - переходит при срабатывании `onSkip`. В данный момент статус не имеет каких-то особенностей. 
Может потребоваться только вне инструкции


- Компоненты инструкции:
1. `Mask` - прожектор, подсвечивает текущий элемент, а также затемняет все остальное пространство
2. `Popover` - обертка для кастомного компонента подсказки. Позиционирует подсказку рядом с прожектером

- Хуки
1. `useLocalStorage` - синхронизирует инструкцию с локал сторажем. Позволяет сохранять состояние при 
перезагрузки страницы.
2. `useMutationObserver` - следит за добавлением,удалением элементов, аттрибутов в DOM. Перерасчитывает
размеры прожектера и его положение если оно поменялось
3. `useResizeObserver` - следит за размерами текущего элемента. Если размеры меняются то перерасчитает
размеры выделенной области.
