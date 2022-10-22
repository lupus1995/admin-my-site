import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  signupWrapper: {
    backgroundColor: '#f5f5f9',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '566a7f',
  },
  signupForm: {
    border: '0 solid #d9dee3',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    padding: '24px',
    maxWidth: '305px',
  },
  signupTitle: {
    fontSize: '24px',
    marginBottom: '24px',
    color: '#566a7f',
  },
  signupRow: {
    marginBottom: '15px',
  },
  signupLabel: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#566a7f',
  },
  signupInput: {
    border: '1px solid #d9dee3',
    borderRadius: '5px',
    backgroundColor: '#fff',
    fontSize: '16px',
    outline: 'none',
    padding: '7px 14px',
    width: 'calc(100% - 30px)',
  },
  signupError: {
    color: 'red',
    marginTop: '5px',
    fontSize: '14px',
  },
  signupButton: {
    color: '#fff',
    borderRadius: '5px',
    width: '100%',
    fontSize: '16px',
    textAlign: 'center',
    backgroundColor: '#696cff',
    borderColor: '#696cff',
    padding: '7px 20px',
    border: 'none',
  },
  signupText: {
    color: '#697a8d',
    fontSize: '16px',
    textDecoration: 'none',
  },
  signupLink: {
    color: '#696cff',
    textDecoration: 'none',
  },
});

export default useStyles;
