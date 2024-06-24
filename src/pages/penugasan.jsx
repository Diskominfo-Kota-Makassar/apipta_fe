import { Helmet } from 'react-helmet-async';

import { PenugasanView } from 'src/sections/penugasan/view';

// ----------------------------------------------------------------------

export default function PenugasanPage() {
  return (
    <>
      <Helmet>
        <title> Penugasan | APIP TA </title>
      </Helmet>

      <PenugasanView />
    </>
  );
}
