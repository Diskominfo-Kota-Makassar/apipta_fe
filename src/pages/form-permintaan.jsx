import { Helmet } from 'react-helmet-async';

import TambahPermintaan from 'src/sections/permintaan/view/tambah-permintaan-view';

// ----------------------------------------------------------------------

export default function FormPenugasan() {
  return (
    <>
      <Helmet>
        <title> Form Permintaan | APIP TA </title>
      </Helmet>

      <TambahPermintaan />
    </>
  );
}
