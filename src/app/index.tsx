import { useEffect } from 'react';
import { useGate, useStore } from 'effector-react';
import { Routes, Route } from 'react-router-dom';
import { User, Transaction, Card } from 'domains';
import { Pages } from 'pages';
import { UI } from 'shared';

export const App = () => {
  useGate(User.Model.userGate);
  const { loading, user } = useStore(User.Model.$store);

  useEffect(() => {
    if (user) {
      Card.Model.cards.init();
      Card.Model.filters.fetchFilters();

      Transaction.Model.transactions.init();
      Transaction.Model.filters.fetchFilters();
    }
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

            <Route path="/cards" element={<Pages.CardsPage />} />
            <Route
              path="/cards/:cardID"
              element={<Pages.CardPage />}
            />

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
