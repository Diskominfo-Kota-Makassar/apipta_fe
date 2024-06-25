/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { lazy, Suspense } from 'react';
import DashboardLayout from 'src/layouts/dashboard';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { Routes, Route, Outlet } from 'react-router-dom';
import ThemeProvider from 'src/theme';
import { ProtectedRoute } from './routes/components/protectedRoute';
import { AuthProvider } from './routes/hooks/useAuth';
import UsersView from './sections/master/users_view';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const PenugasanPage = lazy(() => import('src/pages/penugasan'));
export const FormPenugasanPage = lazy(() => import('src/pages/form-penugasan'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const FormTambahUser = lazy(() => import('src/sections/master/form-tambah-user'));
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
                  <PenugasanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="penugasan/tambah-penugasan"
              element={
                <ProtectedRoute>
                  <FormPenugasanPage />
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
                  <FormTambahUser />
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
