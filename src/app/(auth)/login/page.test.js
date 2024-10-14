import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PreperlyLogin from './page';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login Page', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  test('should display login form', () => {
    render(<PreperlyLogin />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('should validate user credentials', () => {
    render(<PreperlyLogin />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'us' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Register/i));
    expect(screen.getByText(/Username must be at least 3 characters long/i)).toBeInTheDocument();
    expect(screen.getByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  test('should redirect to dashboard on successful login', () => {
    const { push } = useRouter();
    render(<PreperlyLogin />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'validuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'validpassword' } });
    fireEvent.click(screen.getByText(/Register/i));
    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  test('should display error message on failed login', () => {
    render(<PreperlyLogin />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'invalidpassword' } });
    fireEvent.click(screen.getByText(/Register/i));
    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });
});