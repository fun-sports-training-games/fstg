import { Grid, IconButton, List, ListItem, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { Exercise } from '../../../model/Exercise.model';
import EditExerciseDialog from '../../../components/organisms/edit-exercise-dialog/EditExerciseDialog';
import DeleteConfirmationDialog from '../../../components/molecules/delete-confirmation-dialog/DeleteConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { getPageIdPrefix } from '../../../util/id-util';
import PageTitleActionButton from '../../../components/molecules/page-title-action/PageTitleAction';
import useEntityManager from '../../../hooks/useEntityManager';
import AddButton from '../../../components/atoms/add-button/AddButton';

const ManageExercises: FC = (): JSX.Element => {
    const pageName = 'manage_exercises';
    const idPrefix = getPageIdPrefix(pageName);
    const { t } = useTranslation();
    const { entities } = useEntityManager<Exercise>('exercises');

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
        setExercises(entities);
    }, [entities]);

    const handleUpdate = (exercise: Exercise) => {
        setExercise(exercise);
        setOpenDialog(true);
    };

    return (
        <>
            <PageTitleActionButton
                actionButton={<AddButton onClick={() => setOpenDialog(true)} testId={`${idPrefix}add_button`} />}
                titleTranslationKey="page.manageExercises.exercises"
                idPrefix={idPrefix}
            ></PageTitleActionButton>
            <Stack ml={2} mr={2} mt={3} mb={3}>
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
                <EditExerciseDialog
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
                    entityName="exercises"
                    closeDialog={() => setOpenDeleteConfirmationDialog(false)}
                />
            </Stack>
        </>
    );
};
export default ManageExercises;
