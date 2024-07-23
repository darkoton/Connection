import vars from './vars';

//< " RESPONSIVE VALUE " >=============================================================================================================>//
export function adaptivValue(
  $property,
  $startSize,
  $minSize,
  $type,
  $direction = null,
  $width = null,
) {
  const $addSize = $startSize - $minSize;

  if ($direction == 'vertical') {
    return `${$property}: calc(${$minSize + 'px'} + ${$addSize} * ((100vh - 640px) / ${vars.$maxHeight - 640}))`;
  } else if ($type == 1) {
    return `
     ${$property}: ${$startSize + 'px'};

    @media (max-width: ${($width || vars.$maxWidthContainer) + 'px'}) {
      ${$property}: calc(${$minSize + 'px'} + ${$addSize} * ((100vw - 320px) / ${($width || vars.$maxWidthContainer) - 320}));
    }`;
  } else if ($type == 2) {
    /* If there is more container */
    return ` ${$property}: ${$startSize + 'px'};

    @media (min-width: ${($width || vars.$maxWidthContainer) + 'px'}) {
      ${$property}: calc(${$minSize + 'px'} + ${$addSize} * ((100vw - 320px) / ${vars.$maxWidth - 320}));
    }`;
  } else {
    /* Always */
    return `${$property}: calc(${$minSize + 'px'} + ${$addSize} * ((100vw - 320px) / ${vars.$maxWidth - 320}));`;
  }
}

//< " STYLE SCROLLBAR " >
export function scrollbars(
  $size = 10,
  $foregroundColor = '#999',
  $backgroundColor = '#333',
  $borderRadius = 0,
) {
  // For Chrome & Safari
  return `
  &::-webkit-scrollbar {
    width: ${$size}px;
    height: ${$size}px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${$foregroundColor};
    border-radius: ${$borderRadius}px;
  }
  &::-webkit-scrollbar-track {
    background: ${$backgroundColor};
  }
  // Standard version (Firefox only for now)
  @-moz-document url-prefix() {
    scrollbar-color: ${$foregroundColor} ${$backgroundColor};
  }`;
}

export function adaptivIndent(
  $property,
  $startSizeV,
  $minSizeV,
  $startSizeH,
  $minSizeH,
  $type,
) {
  const $addSizeV = $startSizeV - $minSizeV;
  const $addSizeH = $startSizeH - $minSizeH;

  if ($type == 1) {
    /* If less than container */
    return `
    ${$property}: ${$startSizeV + 'px'}  ${$startSizeH + 'px'};

    @media (max-width: ${vars.$maxWidthContainer + 'px'}) {
      ${$property}: calc(${$minSizeV + 'px'} + ${$addSizeV} * ((100vw - 320px) / ${vars.$maxWidthContainer - 320}))
        calc(${$minSizeH + 'px'} + ${$addSizeH} * ((100vw - 320px) / ${vars.$maxWidthContainer - 320}));
    }
    `;
  } else if ($type == 2) {
    /* If there is more container */
    return `
    ${$property}: ${$startSizeV + 'px'} ${$startSizeH + 'px'};

    @media (min-width: ${vars.$maxWidthContainer + 'px'}) {
      ${$property}: calc(${$minSizeV + 'px'} + ${$addSizeV} * ((100vw - 320px) / ${vars.$maxWidth - 320}))
        calc(${$minSizeH + 'px'} + ${$addSizeH} * ((100vw - 320px) / ${vars.$maxWidth - 320}));
    }
        `;
  } else {
    /* Always */
    return `
    ${$property}: calc(${$minSizeV + 'px'} + ${$addSizeV} * ((100vw - 320px) / ${vars.$maxWidth - 320}))
      calc(${$minSizeH + 'px'} + ${$addSizeH} * ((100vw - 320px) / ${vars.$maxWidth - 320}));
      `;
  }
}
