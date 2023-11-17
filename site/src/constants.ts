import { StepType } from 'lib/src'

export const steps: StepType[] = [
    {
        selector: '[data-guide=one]',
        content:
            'Вы запустили инструкцию которая научит вас создавать такие же. Нажмите на кнопку next чтобы продолжить ',
        disableBackStepBtn: true,
    },
    {
        selector: '[data-guide=quick-start]',
        content:
            'Чтобы начать использовать инструкцию вам нужно объявить ваши шаги и передать их в GuideProvider. Также вам нужно передать в PopperContent ваш компонент который будет отображать контент подсказки',
        placement: 'top',
    },
    {
        selector: '[data-guide=Three]',
        content:
            'Вы запустили инструкцию которая научит вас создавать такие же. А также покажет вам все основные моменты ее использования',
        placement: 'top',
    },
]
