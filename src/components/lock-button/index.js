import React, { useReducer } from 'react';

import './style.scss';

const initialState = {
  stage: 'INITIAL',
  text: '',
  textClass: '',
  nextStage: null,
  nextText: null,
  nextTextClass: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'MERGE_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'ANIMATION_END':
      return {
        ...initialState,
        stage: state.nextStage,
        text: state.nextText,
      };
    default:
      return state;
  }
};

const LockButton = ({ stage, children, progress, onClick }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    text: children,
  });

  if (state.stage === 'INITIAL' && stage === 'PROGRESS') {
    dispatch({
      type: 'MERGE_DATA',
      payload: {
        stage: 'TRANSITION',
        textClass: 'translate-right',
        nextStage: 'PROGRESS',
        nextText: children,
        nextTextClass: 'translate-left reverse',
      },
    });
  } else if (stage === 'PROGRESS') {
    const key = state.stage === 'TRANSITION' ? 'nextText' : 'text';
    if (state[key] !== children) {
      dispatch({
        type: 'MERGE_DATA',
        payload: {
          [key]: children,
        },
      });
    }
  } else if (state.stage === 'PROGRESS' && stage === 'DONE') {
    dispatch({
      type: 'MERGE_DATA',
      payload: {
        stage: 'TRANSITION',
        nextStage: 'DONE',
        textClass: 'fade-out',
        nextText: children,
        nextTextClass: 'fade-in',
      },
    });
  } else if (state.stage === 'DONE' && stage === 'INITIAL') {
    dispatch({
      type: 'MERGE_DATA',
      payload: {
        stage: 'TRANSITION',
        nextStage: 'INITIAL',
        textClass: 'translate-left',
        nextText: children,
        nextTextClass: 'translate-right reverse',
      },
    });
  }

  return (
    <button className='btn action-btn action-lock' onClick={onClick}>
      <div className='btn__progress' style={{ width: `${progress}%` }} />
      <span className={`btn__text ${state.textClass}`}>{state.text}</span>
      {state.nextText && (
        <span
          onAnimationEnd={() => dispatch({ type: 'ANIMATION_END' })}
          className={`btn__text ${state.nextTextClass}`}
        >
          {state.nextText}
        </span>
      )}
    </button>
  );
};

export default LockButton;
