import { Helmet } from 'react-helmet-async';

import TambahPermohonan from 'src/sections/user/view/tambah-permohonan-view';

// ----------------------------------------------------------------------

export default function FormPermohonan() {
  return (
    <>
      <Helmet>
        <title> Permohonan | Kelurahan Manggala </title>
      </Helmet>

      <TambahPermohonan />
    </>
  );
}
