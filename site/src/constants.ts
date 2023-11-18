import { StepType } from 'react-voyager/src'

export const steps: StepType[] = [
    {
        selector: '[data-voyager=first-step]',
        content:
            'You have launched a guide that will tell you about the features of this library! Click "Next" to continue',
        disableBackStepBtn: true,
    },
    {
        selector: '[data-voyager=resizeObserver]',
        content:
            'react-voyager uses ResizeObserver to monitor changes in the size of the highlighted area. You can be sure that the highlighted area will always correspond to the size of the element.',
        placement: 'top',
    },
    {
        selector: '[data-voyager=next-btn]',
        content:
            'You can interact with your content by passing stepInteraction in the step settings. Click the button to continue. The transition will occur thanks to useVoyagerHelpers.',
        placement: 'left',
        stepInteraction: true,
        disableNextStepBtn: true,
    },
    {
        selector: '[data-voyager=transitionend]',
        content:
            "react-voyager listens for the transitionend event. Therefore, you don't have to worry if your element changes its position.",
        placement: 'top-start',
        stepInteraction: true,
    },
    {
        selector: '[data-voyager=localStorage]',
        content:
            "If you need to remember the state of the guide across page reloads, it's no problem! Just pass localStorageKey, and react-voyager will save the state in localStorage. Click the button to see how it works!",
        placement: 'right',
        stepInteraction: true,
    },
    {
        selector: '[data-voyager=mutationObserver]',
        content:
            "react-voyager uses a MutationObserver to track the appearance of an element on the page. If it's not present on the page, it will wait until it appears, and this waiting time is determined by the loadingTimeout property, which is set to 5000 milliseconds by default. Click to check it out!",
        placement: 'right',
        stepInteraction: true,
    },
]
