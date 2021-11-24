import { Grid, IconButton, List, ListItem, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { Exercise } from '../../model/exercise';
import FormDialog from '../../components/FormDialog';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { getPageIdPrefix } from '../../util/id-util';
import AddButton from '../../components/atoms/AddButton';

const ManageExercises: FC = (): JSX.Element => {
    const pageName = 'manage_exercises';
    const idPrefix = getPageIdPrefix(pageName);
    const { t } = useTranslation();
    const firestore = useFirestore();

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();
    const [exercise, setExercise] = useState<Exercise>();

    const handleDelete = async (exercise: Exercise) => {
        setExerciseToDelete(exercise);
        setOpenDeleteConfirmationDialog(true);
    };

    useEffect(() => {
        firestore.collection('exercises').onSnapshot((snapshot) => {
            const exercises = snapshot.docs.map((doc) => {
                const { id } = doc;
                return { id, ...doc.data() };
            });
            setExercises(exercises as Exercise[]);
        });
    }, [firestore]);

    const handleUpdate = (exercise: Exercise) => {
        setExercise(exercise);
        setOpenDialog(true);
    };

    return (
        <Stack ml={2} mr={2} mt={3}>
            <AddButton onClick={() => setOpenDialog(true)} testId={`${idPrefix}add_exercise_button`} />
            <List>
                {exercises.map((exercise: Exercise) => {
                    return (
                        <Grid container key={exercise.id} display={'flex'} flexDirection={'row'}>
                            <Grid item xs={8}>
                                <ListItem key={exercise.id}>{exercise.name}</ListItem>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => handleUpdate(exercise)}>
                                    <Edit htmlColor={'steelblue'} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={() => {
                                        handleDelete(exercise);
                                    }}
                                >
                                    <Delete htmlColor={'palevioletred'} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    );
                })}
            </List>
            <FormDialog
                title={t('dialog.editExercise.title')}
                message={t('dialog.editExercise.message')}
                open={openDialog}
                setOpen={setOpenDialog}
                exercise={exercise}
                setExercise={setExercise}
            />
            <DeleteConfirmationDialog
                openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                itemToDelete={exerciseToDelete}
                collection="exercises"
                closeDialog={() => setOpenDeleteConfirmationDialog(false)}
            />
        </Stack>
    );
};
export default ManageExercises;
