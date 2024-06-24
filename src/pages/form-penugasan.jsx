import { Helmet } from 'react-helmet-async';

import TambahPenugasan from 'src/sections/penugasan/view/tambah-penugasan-view';

// ----------------------------------------------------------------------

export default function FormPenugasan() {
  return (
    <>
      <Helmet>
        <title> Form Penugasan | APIP TA </title>
      </Helmet>

      <TambahPenugasan />
    </>
  );
}
