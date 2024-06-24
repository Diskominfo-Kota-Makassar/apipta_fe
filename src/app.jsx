/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { lazy, Suspense } from 'react';
import DashboardLayout from 'src/layouts/dashboard';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { Routes, Route, Outlet, Navigate, useRoutes } from 'react-router-dom';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { ProtectedRoute } from './routes/components/protectedRoute';
import { AuthProvider } from './routes/hooks/useAuth';
import UsersView from './sections/master/users_view';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const PermohonanPage = lazy(() => import('src/pages/permohonan'));
export const FormPermohonanPage = lazy(() => import('src/pages/form-permohonan'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Suspense>
                  <Outlet />
                </Suspense>
              </DashboardLayout>
            }
          >
            {/* Index Page (default) */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <IndexPage />
                </ProtectedRoute>
              }
            />

            {/* Permohonan Page */}
            <Route
              path="penugasan"
              element={
                <ProtectedRoute>
                  <PermohonanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <UsersView />
                </ProtectedRoute>
              }
            />

            {/* Form Permohonan Page */}
            <Route
              path="users/tambah-user"
              element={
                <ProtectedRoute>
                  {' '}
                  <FormPermohonanPage />{' '}
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
