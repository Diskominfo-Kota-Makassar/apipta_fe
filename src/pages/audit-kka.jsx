import { Helmet } from 'react-helmet-async';

import { AuditKKAView } from 'src/sections/audit-kka/view';

// ----------------------------------------------------------------------

export default function AuditKKAPage() {
  return (
    <>
      <Helmet>
        <title> Audit KKA | APIP TA </title>
      </Helmet>

      <AuditKKAView />
    </>
  );
}
