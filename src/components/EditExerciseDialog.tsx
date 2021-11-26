import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';
import { Exercise } from '../model/exercise';
import { useSnackbar } from 'notistack';
import TextField from './atoms/TextField';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    exercise?: Exercise;
    setExercise: Dispatch<SetStateAction<Exercise | undefined>>;
    title: string;
    message: string;
};

const emptyExercise = {
    name: '',
    imageOrGif: '',
    defaultType: '',
    defaultValue: 0,
    defaultResult: 0,
    defaultDistance: 0,
    defaultTargetSize: 0
};

const EditExerciseDialog = ({
    open,
    setOpen,
    title,
    message,
    exercise = emptyExercise,
    setExercise
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const firestore = useFirestore();
    const handleClose = () => {
        setOpen(false);
        setExercise(emptyExercise);
    };

    const handleUpdate = () => {
        if (exercise?.id) {
            firestore
                .collection('exercises')
                .doc(exercise?.id)
                .update(exercise)
                .then(() => {
                    enqueueSnackbar(`${exercise.name} was successfully updated`, { variant: 'success' });
                    setOpen(false);
                })
                .catch(() => {
                    enqueueSnackbar(`${exercise.name} could not be updated`, { variant: 'error' });
                });
        }
    };

    const handleCreate = () => {
        firestore
            .collection('exercises')
            .add(exercise)
            .then(() => {
                enqueueSnackbar(`${exercise?.name} has been added successfully!`, { variant: 'success' });
                setOpen(false);
                setExercise(emptyExercise);
            })
            .catch(() => {
                enqueueSnackbar(`${exercise.name} could not be created`, { variant: 'error' });
            });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    <Stack spacing={2} mt={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Exercise Name"
                            type="text"
                            fullWidth
                            value={exercise?.name}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setExercise({ ...exercise, name: event.target.value })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="imageOrGif"
                            label="Image or GIF URL"
                            type="text"
                            fullWidth
                            value={exercise?.imageUrl}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                exercise && setExercise({ ...exercise, imageUrl: event.target.value })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="defaultType"
                            label="Default type"
                            type="text"
                            fullWidth
                            value={exercise?.defaultType}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                exercise && setExercise({ ...exercise, defaultType: event.target.value })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="defaultValue"
                            label="Default value"
                            type="number"
                            fullWidth
                            value={exercise?.defaultValue}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                exercise && setExercise({ ...exercise, defaultValue: parseInt(event.target.value) })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="defaultResult"
                            label="Default result"
                            type="number"
                            fullWidth
                            value={exercise?.defaultResult}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                exercise && setExercise({ ...exercise, defaultResult: parseInt(event.target.value) })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="defaultDistance"
                            label="Default distance"
                            type="number"
                            fullWidth
                            value={exercise?.defaultDistance}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                exercise && setExercise({ ...exercise, defaultDistance: parseInt(event.target.value) })
                            }
                        />
                        <TextField
                            margin="dense"
                            id="defaultTargetSize"
                            label="Default target size"
                            type="number"
                            fullWidth
                            value={exercise?.defaultTargetSize}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                exercise &&
                                setExercise({ ...exercise, defaultTargetSize: parseInt(event.target.value) })
                            }
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('global.cancel')}</Button>
                    <Button onClick={() => (exercise?.id ? handleUpdate() : handleCreate())}>
                        {t(exercise?.id ? 'global.save' : 'global.create')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditExerciseDialog;
