import styled from 'styled-components';
import useStore from '../features/store';
import { CartIcon } from '../constants/icons';

const Navbar = () => {
  const amount = useStore((state) => state.cart.amount);

  return (
    <NavbarWrapper>
      <div className="nav-center">
        <h3>REAL DATA UMC PlayList by CHLOE</h3>
        <div className="nav-container">
          <CartIcon size="44px" color="#ffffff" />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.nav`
  background: #2f16ff;
  color: white;
  padding: 2rem;

  .nav-center {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 2.2rem;
      font-weight: 300;
    }

    .nav-container {
      display: flex;
      align-items: center;

      .amount-container {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        color: #ffffff;
        padding: 0.5rem;
        font-size: 1.4rem;
        font-weight: 900;
        margin-left: -0.5rem;
        margin-bottom: 5rem;
      }
    }
  }
`;
