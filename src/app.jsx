/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { lazy, Suspense } from 'react';
import DashboardLayout from 'src/layouts/dashboard';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { Routes, Route, Outlet } from 'react-router-dom';
import ThemeProvider from 'src/theme';
import { ProtectedRoute } from './routes/components/protectedRoute';
import { AuthProvider } from './routes/hooks/useAuth';
import UsersView from './sections/master/user/view/users_view';
import PermintaanPage from './sections/permintaan/view/permintaan-view';
import ValidasiPermintaan from './sections/permintaan/view/validasi-permintaan';
import TambahAuditKKA from './sections/audit-kka/view/tambah-audit-kka';
import AnggotaTim from './sections/audit-kka/view/session/anggota-tim';

export const IndexPage = lazy(() => import('src/pages/app'));
export const PenugasanPage = lazy(() => import('src/pages/penugasan'));
export const FormPenugasanPage = lazy(() => import('src/pages/form-penugasan'));
export const FormPermintaanPage = lazy(() => import('src/pages/form-permintaan'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AuditKKAView = lazy(() => import('src/sections/audit-kka/view/audit-kka-view'));
export const FormTambahUser = lazy(() => import('src/sections/master/user/view/form-tambah-user'));
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
            {/* Permintaan Page */}
            <Route
              path="permintaan"
              element={
                <ProtectedRoute>
                  <PermintaanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="permintaan/tambah-permintaan"
              element={
                <ProtectedRoute>
                  <FormPermintaanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="permintaan/validasi-permintaan"
              element={
                <ProtectedRoute>
                  <ValidasiPermintaan />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka"
              element={
                <ProtectedRoute>
                  <AuditKKAView />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/tambah-audit-kka"
              element={
                <ProtectedRoute>
                  <TambahAuditKKA />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/anggota-tim"
              element={
                <ProtectedRoute>
                  <AnggotaTim />
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
