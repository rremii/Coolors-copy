import compose from "compose-function"
import { withRouter } from "./with-router"
import { withStore } from "./with-store"
import { withSuspense } from "./with-suspense.tsx"

export const withProviders = compose(
  withRouter,
  withStore,
  withSuspense
)
