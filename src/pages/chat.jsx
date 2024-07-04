import { Helmet } from 'react-helmet-async';

import { ChatView } from 'src/sections/chat/view';

// ----------------------------------------------------------------------

export default function PenugasanPage() {
  return (
    <>
      <Helmet>
        <title> Chat | APIP TA </title>
      </Helmet>

      <ChatView />
    </>
  );
}
