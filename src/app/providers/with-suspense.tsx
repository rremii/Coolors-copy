import React, { FC, Suspense } from "react"

export const withSuspense = (Component: FC) => () => {
  return (
    <Suspense fallback={"LOADING"}>
      <Component />
    </Suspense>
  )
}
