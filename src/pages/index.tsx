import React from "react"
import { Route, Routes } from "react-router-dom"
import AppLayout from "../app/layout/AppLayout.tsx"
import { ColorsPage } from "./colors/Colors.page.tsx"

export const Routing = () => {
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/*" element={<ColorsPage />} />
        </Routes>
      </AppLayout>
    </>
  )
}
