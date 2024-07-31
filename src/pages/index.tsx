import React from "react"
import { Route, Routes } from "react-router-dom"
import AppLayout from "../app/layout/AppLayout.tsx"
import { ColorsPage } from "./colors/Colors.page.tsx"
import Layout from "../app/layout/Layout.tsx"
import { ProfilePageWithAuth } from "./profile/Profile.page.tsx"

export const Routing = () => {


  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/profile" element={
            <ProfilePageWithAuth />
          } />
          <Route path="/*" element={
            <Layout>
              <ColorsPage />
            </Layout>
          } />
        </Routes>
      </AppLayout>
    </>
  )
}
