import { UI } from 'shared';
import { useGate, useStore } from 'effector-react';
import { Routes, Route } from 'react-router-dom';
import { Pages } from 'pages';
import { Model } from 'domains/user';

export const App = () => {
  useGate(Model.userGate);
  const user = useStore(Model.$user);
  const loading = Model.isUserLoading(user);

  return (
    <UI.Layout>
      <UI.Header>
        <UI.Logo>_Bank</UI.Logo>
        {!loading && <UI.Navigation />}
        {!loading && <UI.Account text={user.fullName} />}
      </UI.Header>
      <div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/cards" element={<Pages.Cards />} />
            <Route
              path="/transactions"
              element={<Pages.Transactions />}
            >
              <Route
                path="/transactions/:transactionID"
                element={<Pages.Transactions />}
              />
            </Route>
          </Routes>
        )}
      </div>
    </UI.Layout>
  );
};
