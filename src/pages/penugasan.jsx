import { Helmet } from 'react-helmet-async';

import { PenugasanView } from 'src/sections/user/view';

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
