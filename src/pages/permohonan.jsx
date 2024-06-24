import { Helmet } from 'react-helmet-async';

import { PermohonanView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PermohonanPage() {
  return (
    <>
      <Helmet>
        <title> Permohonan | Kelurahan Manggala </title>
      </Helmet>

      <PermohonanView />
    </>
  );
}
