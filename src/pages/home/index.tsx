import { memo } from 'react';
import { UI } from 'shared';

export const Home = memo(() => {
  return (
    <UI.Content>
      <h1>Wellcome to my awesome bank</h1>
    </UI.Content>
  );
});
