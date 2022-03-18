import { useEffect } from 'react';
import { useGate, useStore } from 'effector-react';
import { Routes, Route } from 'react-router-dom';
import { UI } from 'shared';
import { Pages } from 'pages';
import { User, Transaction } from 'domains';

export const App = () => {
  useGate(User.Model.userGate);
  const { loading, user } = useStore(User.Model.$store);

  useEffect(() => {
    // TODO switch to gate
    if (user) {
      Transaction.Model.transactions.init();
    }
    return () => {
      Transaction.Model.transactions.reset();
    };
  }, [user]);

  return (
    <UI.Layout>
      <UI.Header>
        <UI.Logo>_Bank</UI.Logo>
        {!loading && <UI.Navigation />}
        {user && <UI.Account user={user} />}
      </UI.Header>
      <div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/cards" element={<Pages.Cards />}>
              <Route
                path="/cards/:cardID"
                element={<Pages.Cards />}
              />
            </Route>
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
