import { FC, useState } from 'react';
import PasswordField from '../../components/PasswordField';
import { Button, Stack, TextField } from '@mui/material';
import logger from '../../logging/logger';
import AuthContainer from '../../components/AuthContainer';
import { useTranslation } from 'react-i18next';

const RegistrationPage: FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const signUpWithEmailAndPassword = () => {
        if (error !== '') {
            setError('');
        }
    };

    return (
        <AuthContainer header={t('page.register.header')}>
            <form>
                <Stack padding={2} spacing={2} alignItems={'center'}>
                    <TextField
                        fullWidth
                        id={'email-field'}
                        label={t('common.email')}
                        value={email}
                        required
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        // error
                        // helperText={'email already in use!'}
                    />
                    <PasswordField
                        id={'password-field'}
                        autoComplete={'new-password'}
                        label={t('common.password')}
                        value={password}
                        required
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <PasswordField
                        id={'confirm-password-field'}
                        autoComplete={'new-password'}
                        label={t('page.register.label.confirmPassword')}
                        value={confirmPassword}
                        required
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                            logger.warn('hello warn');
                        }}
                    />
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        fullWidth
                        disabled={!email || !password || !confirmPassword}
                        onClick={(e) => {
                            e.preventDefault();
                            signUpWithEmailAndPassword();
                        }}
                    >
                        {t('page.register.button.register')}
                    </Button>
                </Stack>
            </form>
        </AuthContainer>
    );
};

export default RegistrationPage;
