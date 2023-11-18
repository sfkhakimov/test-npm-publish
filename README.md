# react-voyager 
A library that allows you to create stunning interactive guides.

## [Introduction](#introduction)

Once, I faced the task of creating a large interactive guide to lead users through a specific website usage process.
I experimented with libraries such as `react-joyride` and `reactour`. While these are great libraries, they didn't quite suit my task's conditions.
I needed to consider that an element might not appear immediately on the page, or its dimensions could change.
It might move, or the user could accidentally reload the page. That's when the idea of creating a new library to solve these issues came to mind.



## [Quick Start](#quick-start)

To get started, you need to install the package:

```commandline
npm install react-voyager
```

Then, to use the guide, you need to wrap your application with the `VoyagerProvider` and pass it the steps of your guide as well
as the `PopperContent` that will display your tooltip content:

```tsx
import React from 'react';
import { VoyagerProvider, PopperContentProps } from 'react-voyager';

const steps = [
    {
        selector: '[data-voyager=One]',
        content: 'Content of the first step', // Here you can place your content. It can be any JSX.Element
    },
    {
        selector: '[data-voyager=Two]',
        content: 'Content of the second step',
    },
    {
        selector: '[data-voyager=Three]',
        content: 'Content of the third step',
    },
];

const PopperContent = ({
    content,
    goNextStep,
    goBackStep,
    skip,
}: PopperContentProps) => {
    return (
        <div>
            {content}
            <button onClick={skip}>skip</button>
            <button onClick={goBackStep}>back</button>
            <button onClick={goNextStep}>next</button>
        </div>
    );
};

const App = ({ children }) => {
    return (
        <VoyagerProvider
            PopperContent={PopperContent}
            steps={steps}
        >
            {children}
        </VoyagerProvider>
    );
};
```


To initiate the guide, you need to call the `start` function from `useVoyagerHelpers`:

```tsx
import { useVoyagerHelpers } from 'react-voyager';

const MyComponent = () => {
    const { start } = useVoyagerHelpers();
    return (
        <div>
            ...some content here
            <button onClick={start}>Start voyage</button>
        </div>
    );
};
```

## [Hooks](#hooks)

There are two main hooks you can use to control the guide in your components: `useVoyager` and `useVoyagerHelpers`

<br />

### useVoyager:

<br />

`isOpen`: indicates whether the guide is currently active or not.

`currentStep`: the index of the current step.

`steps`: an array containing your guide steps.

`currStep`: the current step.

`nextStep`: move to the next step.

`prevStep`: move to the previous step.

`startAt`: the step at which the guide started.

`status`: the current status of the step (VoyagerStatusesEnum).


<br />

### useVoyagerHelpers:

<br />

`start`: initiates the guide (transitions to VoyagerStatusesEnum.Active).

`stop`: stops the guide (transitions to VoyagerStatusesEnum.Stopped).

`goNextStep`: navigates to the next step.

`goBackStep`: navigates to the previous step.

`goToStep`: navigates to a specific step, taking the step index as an argument.

`skip`: skips and completes the guide (transitions to VoyagerStatusesEnum.Skipped).

`updateSteps`: updates the steps of your guide, taking the step selector and StepType as arguments.



## [Types](#types)

<br />

### VoyagerProviderProps:

<br />

`rootEl?`: selector inside which the guide components will be placed. Default is `body`

`localStorageKey?`: key for saving guide steps in local storage, if provided, the guide will remember its state upon page reload

`loadingTimeout?`: time in milliseconds the guide will wait for a step to appear on the page. Default is `5000`

`loader?`: JSX.Element to be displayed while the guide is waiting for `loadingTimeout`

`steps`: array of guide steps

`styles?`: styles object. You can pass styles for `popper`, `mask`, and `overlay`

`padding?`: padding for `popper`, `mask`, and `overlay`

`placement?`: guide placement, can be controlled at each step. Default is `bottom`

`disableInteraction?`: disables interaction with the highlighted area. Default is `none`

`afterOpen?`: function that will be executed upon provider mounting

`beforeClose?`: function that will be executed upon provider unmounting

`onClickHighlighted?`: function for clicking on the background

`scrollSmooth?`: controls smooth scrolling. If `true`, the scroll will be `smooth`; otherwise, `auto`. Default is `true`

`PopperContent`: component to be passed as the tooltip content

`Wrapper?`: wrapper component for all `VoyagerProvider` components. Default is `React.Fragment`

`onChangeStep?`: asynchronous function that will be called when the step changes

`defaultOpen?`: default is `false`. If `true`, the guide will start immediately

`startAt?`: default is `0`. Index of the step where the guide starts

`beforeStart?`: asynchronous function executed before starting the guide

`afterStart?`: asynchronous function executed immediately after starting the guide

`beforeStop?`: asynchronous function executed before stopping the guide

`afterStop?`: asynchronous function executed after stopping the guide


<br />

### StepType:

<br />

`selector`: CSS selector of your step

`title?`: step title

`content`: step content

`placement?`: tooltip placement next to the highlighted area

`stepInteraction?`: if `true`, interaction with the highlighted content is possible

`padding?`: padding for `popper`, `mask`, and `overlay`

`styles?`: styles for `popper`, `mask`, and `overlay`

`loadingTimeout?`: time in milliseconds the guide will wait for the step to appear. Default is `5000`

`onBeforeStep?`: asynchronous function executed before transitioning to the next step

`onAfterStep?`: asynchronous function executed after transitioning to the next step

`onChangeStep?`: asynchronous function executed during the transition to the next step

`meta?`: any information you want, accessible inside `PopperContent`

`canDisplayWhenPageReload?`: controls whether this step should be displayed on page reload. Default is `true`. If `false`, it will display the previous step

`disableNextStepBtn?`: disable the `next` button

`disableBackStepBtn?`: disable the `back` button

