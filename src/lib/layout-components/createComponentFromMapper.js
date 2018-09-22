import React from 'react'

export const createComponentFromMapper = mapperFn => ({
  is: Comp = 'div',
  ...otherProps
}) => <Comp {...mapperFn(otherProps)} />
