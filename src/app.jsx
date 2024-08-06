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
import KetuaTim from './sections/audit-kka/view/session/ketua-tim';
import KetuaTim2 from './sections/audit-kka/view/session/ketua-tim2';
import KetuaTim3 from './sections/audit-kka/view/session/ketua-tim3';
import KetuaTim4 from './sections/audit-kka/view/session/ketua-tim4';
import Dalnis from './sections/audit-kka/view/session/dalnis';
import WPJ from './sections/audit-kka/view/session/wpj';
import BPKP from './sections/audit-kka/view/session/bpkp';
import Obrik from './sections/audit-kka/view/session/obrik';
import PJ from './sections/audit-kka/view/session/pj';
import KPK from './sections/audit-kka/view/session/kpk';
import TambahKompilasi from './sections/kompilasi/view/tambah-kompilasi';
import LihatKompilasi from './sections/kompilasi/view/lihat-kompilasi';
import { SimakdaView } from './sections/simakda/view';
import LaporanPage from './sections/laporan/view/laporan-view';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ChatView = lazy(() => import('src/pages/chat'));
export const PenugasanPage = lazy(() => import('src/pages/penugasan'));
export const FormPenugasanPage = lazy(() => import('src/pages/form-penugasan'));
export const FormPermintaanPage = lazy(() => import('src/pages/form-permintaan'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AuditKKAView = lazy(() => import('src/sections/audit-kka/view/audit-kka-view'));
export const KompilasiView = lazy(() => import('src/sections/kompilasi/view/kompilasi-view'));
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

            <Route
              path="laporan"
              element={
                <ProtectedRoute>
                  <LaporanPage />
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
              path="audit-kka/ketua-tim"
              element={
                <ProtectedRoute>
                  <KetuaTim />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/ketua-tim-review-1"
              element={
                <ProtectedRoute>
                  <KetuaTim2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/ketua-tim-review-2"
              element={
                <ProtectedRoute>
                  <KetuaTim3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/ketua-tim-review-3"
              element={
                <ProtectedRoute>
                  <KetuaTim4 />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/dalnis"
              element={
                <ProtectedRoute>
                  <Dalnis />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/wpj"
              element={
                <ProtectedRoute>
                  <WPJ />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/bpkp"
              element={
                <ProtectedRoute>
                  <BPKP />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/obrik"
              element={
                <ProtectedRoute>
                  <Obrik />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/pj"
              element={
                <ProtectedRoute>
                  <PJ />
                </ProtectedRoute>
              }
            />
            <Route
              path="audit-kka/kpk"
              element={
                <ProtectedRoute>
                  <KPK />
                </ProtectedRoute>
              }
            />
            <Route
              path="kompilasi"
              element={
                <ProtectedRoute>
                  <KompilasiView />
                </ProtectedRoute>
              }
            />

            <Route
              path="kompilasi/tambah-temuan"
              element={
                <ProtectedRoute>
                  <TambahKompilasi />
                </ProtectedRoute>
              }
            />
            <Route
              path="kompilasi/lihat-kompilasi"
              element={
                <ProtectedRoute>
                  <LihatKompilasi />
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
            {/* simakda */}
            <Route
              path="simakda"
              element={
                <ProtectedRoute>
                  <SimakdaView />
                </ProtectedRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <ChatView />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
